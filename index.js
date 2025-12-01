const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

// GraphQL Schema
const typeDefs = gql`
  type Course {
    id: ID!
    name: String!
    instructor: String!
    category: String!
    schedule: String!
  }

  type Student {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    universityId: ID!
  }

  type Enrollment {
    id: ID!
    studentId: ID!
    course: ID!
    courseName: String
    instructor: String
  }

  type CourseWithStudents {
    course: Course!
    enrolledStudents: [Student!]!
  }

  type Query {
    coursesWithStudents: [CourseWithStudents!]!
    courses: [Course!]!
    students: [Student!]!
    courseEnrollments(courseId: ID!): [Enrollment!]!
    studentEnrollments(studentId: ID!): [Enrollment!]!
  }

  type Mutation {
    enrollStudent(courseId: ID!, studentId: ID!): Enrollment!
    unenrollStudent(enrollmentId: ID!): Boolean!
    updateEnrollment(enrollmentId: ID!, newCourseId: ID): Enrollment!
  }
`;

// Resolvers - How to fetch the data
const resolvers = {
  Query: {
    // Main query: Get courses with their enrolled students
    coursesWithStudents: async () => {
      try {
        console.log('Fetching courses with students...');
        
        // 1. Get all courses
        const coursesResponse = await axios.get('http://localhost:8082/courses/getAll/');
        const courses = coursesResponse.data;
        console.log(`Found ${courses.length} courses`);
        
        // 2. For each course, get enrolled students
        const result = [];
        
        for (const course of courses) {
          try {
            // Get enrollments for this course
            const enrollmentsResponse = await axios.get(`http://localhost:8082/courses/enrollments/course/${course.id}/`);
            const enrollments = enrollmentsResponse.data;
            const studentIds = enrollments.map(enrollment => enrollment.student_id);
            
            console.log(`Course ${course.name} has ${studentIds.length} enrolled students`);
            
            // Get all students
            const studentsResponse = await axios.get('http://localhost:8081/api/students');
            const allStudents = studentsResponse.data;
            
            // Filter students who are enrolled in this course
            const enrolledStudents = allStudents.filter(student => 
              studentIds.includes(student.id)
            );
            
            result.push({
              course,
              enrolledStudents
            });
          } catch (error) {
            console.error(`Error processing course ${course.id}:`, error.message);
            // Continue with other courses even if one fails
            result.push({
              course,
              enrolledStudents: []
            });
          }
        }
        
        return result;
      } catch (error) {
        console.error('Error in coursesWithStudents:', error.message);
        throw new Error('Failed to fetch courses with students');
      }
    },
    
    // Get all courses
    courses: async () => {
      try {
        const response = await axios.get('http://localhost:8082/courses/getAll/');
        return response.data;
      } catch (error) {
        console.error('Error fetching courses:', error.message);
        throw new Error('Failed to fetch courses');
      }
    },
    
    // Get all students
    students: async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/students');
        return response.data;
      } catch (error) {
        console.error('Error fetching students:', error.message);
        throw new Error('Failed to fetch students');
      }
    },
    
    // Get enrollments for a specific course
    courseEnrollments: async (_, { courseId }) => {
      try {
        const response = await axios.get(`http://localhost:8082/courses/enrollments/course/${courseId}/`);
        const enrollments = response.data;
        
        // Get course details for each enrollment
        const courseResponse = await axios.get(`http://localhost:8082/courses/get/${courseId}/`);
        const course = courseResponse.data;
        
        return enrollments.map(enrollment => ({
          id: enrollment.id,
          studentId: enrollment.student_id,
          course: enrollment.course,
          courseName: course.name,
          instructor: course.instructor
        }));
      } catch (error) {
        console.error('Error fetching course enrollments:', error.message);
        throw new Error('Failed to fetch course enrollments');
      }
    },
    
    // Get enrollments for a specific student
    studentEnrollments: async (_, { studentId }) => {
      try {
        const response = await axios.get(`http://localhost:8082/courses/enrollments/student/${studentId}/`);
        const enrollments = response.data;
        
        // Get course details for each enrollment
        const enrichedEnrollments = await Promise.all(
          enrollments.map(async (enrollment) => {
            try {
              const courseResponse = await axios.get(`http://localhost:8082/courses/get/${enrollment.course}/`);
              const course = courseResponse.data;
              
              return {
                id: enrollment.id,
                studentId: enrollment.student_id,
                course: enrollment.course,
                courseName: course.name,
                instructor: course.instructor
              };
            } catch (error) {
              return {
                id: enrollment.id,
                studentId: enrollment.student_id,
                course: enrollment.course,
                courseName: "Unknown Course",
                instructor: "Unknown Instructor"
              };
            }
          })
        );
        
        return enrichedEnrollments;
      } catch (error) {
        console.error('Error fetching student enrollments:', error.message);
        throw new Error('Failed to fetch student enrollments');
      }
    }
  },
  
  Mutation: {
    // Enroll a student in a course
    enrollStudent: async (_, { courseId, studentId }) => {
      try {
        console.log(`Enrolling student ${studentId} in course ${courseId}`);
        
        const response = await axios.post('http://localhost:8082/courses/enroll/', {
          student_id: parseInt(studentId),
          course: parseInt(courseId)
        });
        
        const enrollment = response.data;
        
        // Get course details for the enrollment
        const courseResponse = await axios.get(`http://localhost:8082/courses/get/${courseId}/`);
        const course = courseResponse.data;
        
        return {
          id: enrollment.id || `enrollment-${courseId}-${studentId}`,
          studentId: studentId,
          course: courseId,
          courseName: course.name,
          instructor: course.instructor
        };
      } catch (error) {
        console.error('Error enrolling student:', error.response?.data || error.message);
        throw new Error(`Failed to enroll student: ${error.response?.data?.error || error.message}`);
      }
    },
    
    // Unenroll a student (delete enrollment)
    unenrollStudent: async (_, { enrollmentId }) => {
      try {
        console.log(`Unenrolling student with enrollment ID ${enrollmentId}`);
        
        await axios.delete(`http://localhost:8082/courses/unenroll/${enrollmentId}/`);
        
        return true;
      } catch (error) {
        console.error('Error unenrolling student:', error.response?.data || error.message);
        throw new Error(`Failed to unenroll student: ${error.response?.data?.error || error.message}`);
      }
    },
    
    // Update enrollment (move student to different course)
    updateEnrollment: async (_, { enrollmentId, newCourseId }) => {
      try {
        console.log(`Updating enrollment ${enrollmentId} to course ${newCourseId}`);
        
        // First get the current enrollment to know student ID
        const enrollmentsResponse = await axios.get('http://localhost:8082/courses/enrollments/course/1/');
        const allEnrollments = enrollmentsResponse.data;
        const currentEnrollment = allEnrollments.find(e => e.id.toString() === enrollmentId.toString());
        
        if (!currentEnrollment) {
          throw new Error(`Enrollment ${enrollmentId} not found`);
        }
        
        // Delete old enrollment
        await axios.delete(`http://localhost:8082/courses/unenroll/${enrollmentId}/`);
        
        // Create new enrollment
        const response = await axios.post('http://localhost:8082/courses/enroll/', {
          student_id: currentEnrollment.student_id,
          course: parseInt(newCourseId)
        });
        
        // Get course details
        const courseResponse = await axios.get(`http://localhost:8082/courses/get/${newCourseId}/`);
        const course = courseResponse.data;
        
        return {
          id: response.data.id || `enrollment-${newCourseId}-${currentEnrollment.student_id}`,
          studentId: currentEnrollment.student_id,
          course: newCourseId,
          courseName: course.name,
          instructor: course.instructor
        };
      } catch (error) {
        console.error('Error updating enrollment:', error.response?.data || error.message);
        throw new Error(`Failed to update enrollment: ${error.response?.data?.error || error.message}`);
      }
    }
  }
};

// Create Apollo Server
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  introspection: true,
  playground: true
});

// Start the server
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 GraphQL Server ready at ${url}`);
  console.log(`📚 GraphQL Playground available at ${url}`);
  console.log(`✅ Now supports enrollment mutations!`);
}).catch(error => {
  console.error('Failed to start server:', error);
});