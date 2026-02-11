import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Contact form submitted:", values);
    toast.success("Message Sent", {
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@seatech.gov.in",
      subContent: "For general inquiries & quotes",
      link: "mailto:support@seatech.gov.in",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 11-2345-6789",
      subContent: "Mon-Fri, 9am to 6pm",
      link: "tel:+911123456789",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Industrial Area, Phase 2",
      subContent: "New Delhi - 110020",
      link: null,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-slate-900 to-slate-900"></div>
         <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Have questions about government procurement? Our team is here to help you with tenders, bulk orders, and compliance.
            </p>
         </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20 pb-20">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="border-none shadow-lg shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`w-14 h-14 rounded-2xl ${info.bg} flex items-center justify-center mb-4`}>
                  <info.icon className={`h-7 w-7 ${info.color}`} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">{info.title}</h3>
                {info.link ? (
                  <a href={info.link} className="text-blue-600 font-medium hover:underline text-base">
                    {info.content}
                  </a>
                ) : (
                  <p className="text-slate-900 font-medium text-base">{info.content}</p>
                )}
                <p className="text-slate-500 text-sm mt-1">{info.subContent}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Contact Form */}
          <Card className="border-none shadow-xl shadow-slate-200/60 overflow-hidden">
            <div className="bg-white p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Send us a Message</h2>
                <p className="text-slate-500">Fill out the form below and we'll respond within 24 hours.</p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Full Name</FormLabel>
                        <FormControl><Input className="h-11 bg-slate-50 border-slate-200 focus:bg-white" placeholder="Enter your name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Email Address</FormLabel>
                        <FormControl><Input className="h-11 bg-slate-50 border-slate-200 focus:bg-white" type="email" placeholder="you@department.gov.in" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Subject</FormLabel>
                      <FormControl><Input className="h-11 bg-slate-50 border-slate-200 focus:bg-white" placeholder="Regarding..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Message</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[150px] bg-slate-50 border-slate-200 focus:bg-white resize-none" placeholder="How can we help you?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-lg shadow-md shadow-blue-100 transition-all">
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </form>
              </Form>
            </div>
          </Card>

          {/* Map Section */}
          <div className="space-y-6">
             <Card className="border-none shadow-lg overflow-hidden h-[400px] lg:h-[600px] rounded-2xl bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.0688975472578!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="filter grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                  title="Seatech Location Map"
                />
             </Card>
             
             {/* Office Hours Card */}
             <Card className="border-none shadow-md bg-slate-900 text-white p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                   <div className="p-3 bg-slate-800 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-400" />
                   </div>
                   <div>
                      <h3 className="font-bold text-lg">Office Hours</h3>
                      <p className="text-slate-400 text-sm">Come visit us</p>
                   </div>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                   <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span>Monday - Friday</span>
                      <span className="font-medium text-white">9:00 AM - 6:00 PM</span>
                   </div>
                   <div className="flex justify-between border-b border-slate-800 pb-2 pt-2">
                      <span>Saturday</span>
                      <span className="font-medium text-white">10:00 AM - 2:00 PM</span>
                   </div>
                   <div className="flex justify-between pt-2">
                      <span>Sunday</span>
                      <span className="text-red-400 font-medium">Closed</span>
                   </div>
                </div>
             </Card>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;