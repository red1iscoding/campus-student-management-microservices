import { useState } from "react";
import { Layout } from "../components/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Send, Languages, FileText } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm your Campus Management Assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date()
  }
];

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "I understand your request. I can help you with student records, course information, university details, and more. What would you like to know?",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const quickMessage: Message = {
      id: messages.length + 1,
      text: action,
      sender: "user",
      timestamp: new Date()
    };

    setMessages([...messages, quickMessage]);

    setTimeout(() => {
      let responseText = "";
      if (action === "Translate Text") {
        responseText = "I can help you translate text. Please provide the text you'd like to translate and the target language.";
      } else if (action === "Summarize Text") {
        responseText = "I can summarize text for you. Please provide the text you'd like me to summarize.";
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-gray-900 mb-2">Campus Assistant Chatbot</h1>
          <p className="text-gray-500">Chat with our AI assistant for help with campus management</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Window */}
          <div className="lg:col-span-3">
            <Card className="border-none shadow-md h-[calc(100vh-250px)] flex flex-col">
              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-[#1976D2] text-white">AI</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-md px-4 py-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-[#1976D2] text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === "user" ? "text-blue-100" : "text-gray-500"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    
                    {message.sender === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </CardContent>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message…"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSend}
                    className="bg-[#1976D2] hover:bg-[#1565C0]"
                  >
                    <Send size={20} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="mb-4 text-gray-900">Quick Actions</h3>
                
                <div className="space-y-3">
                  <Button
                    onClick={() => handleQuickAction("Translate Text")}
                    className="w-full justify-start bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
                  >
                    <Languages size={20} className="mr-2 text-[#1976D2]" />
                    Translate Text
                  </Button>
                  
                  <Button
                    onClick={() => handleQuickAction("Summarize Text")}
                    className="w-full justify-start bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
                  >
                    <FileText size={20} className="mr-2 text-[#1976D2]" />
                    Summarize Text
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-[#1976D2] bg-opacity-10 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Tip:</strong> You can ask me about students, courses, universities, and enrollments!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
