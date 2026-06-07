import { Layout } from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { MapPin, Users } from "lucide-react";
import { mockUniversities } from "../data/mockData";

export function UniversitiesPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-gray-900 mb-2">Universities</h1>
          <p className="text-gray-500">Partner universities in our network</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {mockUniversities.map((university) => (
            <Card key={university.id} className="border-none shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src={university.image}
                  alt={university.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardHeader>
                <CardTitle>{university.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <MapPin size={16} className="text-[#1976D2]" />
                  {university.location}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-[#1976D2] bg-opacity-10 flex items-center justify-center">
                      <Users size={20} className="text-[#1976D2]" />
                    </div>
                    <div>
                      <p className="text-2xl text-[#1976D2]">{university.students}</p>
                      <p className="text-sm text-gray-500">Students</p>
                    </div>
                  </div>
                  
                  <Button className="bg-[#1976D2] hover:bg-[#1565C0]">
                    View Students
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
