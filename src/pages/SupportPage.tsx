import React, { useState } from 'react';
import { Search, Mail, ExternalLink, MessageCircle, Phone, Clock, Globe, HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const SupportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // FAQ Data
  const faqs = [
    {
      id: '1',
      category: 'General',
      question: 'What is CyberPack and how can it help me?',
      answer: 'CyberPack is a comprehensive academic resource hub designed specifically for cybersecurity students. It provides organized access to study materials, course resources, lab manuals, and learning tools to enhance your academic journey in cybersecurity.'
    },
    {
      id: '2',
      category: 'Account',
      question: 'How do I access course materials for my semester?',
      answer: 'Navigate to the "Subjects" page, select your academic branch (e.g., Cybersecurity Branch), choose your semester, and then select the specific subject. All associated resources will be displayed for easy access.'
    },
    {
      id: '3',
      category: 'Resources',
      question: 'What types of resources are available on CyberPack?',
      answer: 'CyberPack offers various resource types including PDF documents, presentations, video tutorials, external educational links, lab manuals, practice exercises, reference materials, exams, and disabled (not yet available) resources. All resources are categorized by subject and semester for easy navigation.'
    },
    {
      id: '4',
      category: 'Technical',
      question: 'I cannot download a resource. What should I do?',
      answer: 'First, ensure you have a stable internet connection. If the issue persists, try refreshing the page or clearing your browser cache. If the problem continues, please contact our support team with the specific resource name and error message.'
    },
    {
      id: '5',
      category: 'General',
      question: 'How often are new resources added to the platform?',
      answer: 'Resources are continuously updated throughout the academic year. New materials are typically added at the beginning of each semester, with additional resources added as they become available from instructors and contributors.'
    },
    {
      id: '6',
      category: 'Account',
      question: 'Can I contribute resources to CyberPack?',
      answer: 'Currently, resource management is handled by our administrative team to ensure quality and organization. However, we welcome suggestions for new resources. Please contact us with your recommendations.'
    },
    {
      id: '7',
      category: 'Technical',
      question: 'The website is loading slowly. How can I improve performance?',
      answer: 'Slow loading can be caused by various factors. Try clearing your browser cache, disabling unnecessary browser extensions, or using a different browser. If issues persist across devices, please contact our technical support team.'
    },
    {
      id: '8',
      category: 'Resources',
      question: 'Are the resources available in multiple languages?',
      answer: 'Most resources are available in English, with some materials in French and Arabic depending on the course requirements. The language is indicated in each resource\'s metadata for easy identification.'
    }
  ];

  // External Links
  const externalLinks = [
    {
      title: "University's Official Site",
      url: 'https://fpo.uiz.ac.ma',
      description: 'Access official university information, announcements, academic calendar, and administrative services.',
      icon: Globe,
      category: 'Official'
    },
    {
      title: "University's Official Resources Site",
      url: 'https://ecours-fpo.uiz.ac.ma',
      description: 'Official e-learning platform with course materials, assignments, and instructor communications.',
      icon: ExternalLink,
      category: 'Academic'
    },
    {
      title: 'Student Portal',
      url: 'https://ent-fpo.uiz.ac.ma',
      description: 'Check grades, view schedules, register for courses, and access student services.',
      icon: ExternalLink,
      category: 'Student Services'
    }
  ];

  // Filter FAQs based on search
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with form data
    const subject = encodeURIComponent(contactForm.subject || 'CyberPack Support Request');
    const body = encodeURIComponent(
      `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`
    );
    window.location.href = `mailto:ixo.intelligence@gmail.com?subject=${subject}&body=${body}`;
    // Reset form
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Support & Help
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get assistance and find answers to your academic questions from our support team
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-colors">
            <CardContent className="p-6 text-center">
              <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
              <p className="text-gray-400 mb-4">Get help via email</p>
              <Button
                onClick={() => window.location.href = 'mailto:ixo.intelligence@gmail.com'}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
              >
                ixo.intelligence@gmail.com
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-green-500 transition-colors">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Response Time</h3>
              <p className="text-gray-400 mb-4">We typically respond within</p>
              <Badge className="bg-green-600 text-green-100 text-sm">24-48 hours</Badge>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors">
            <CardContent className="p-6 text-center">
              <HelpCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">FAQ Section</h3>
              <p className="text-gray-400 mb-4">Find quick answers</p>
              <Button
                onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-900 w-full"
              >
                Browse FAQ
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-blue-400" />
              Contact Us Directly
            </CardTitle>
            <CardDescription className="text-gray-400">
              Send us a message and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="subject" className="text-white">Subject</Label>
                <Input
                  id="subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white mt-1"
                  placeholder="Brief description of your inquiry"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-white">Message</Label>
                <Textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white mt-1 min-h-[120px]"
                  placeholder="Please provide detailed information about your question or issue..."
                  required
                />
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div id="faq-section">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              <CardDescription className="text-gray-400">
                Find answers to common questions about CyberPack
              </CardDescription>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>
            </CardHeader>
            <CardContent>
              {Object.keys(groupedFaqs).length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No FAQs found matching your search.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
                    <div key={category}>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Badge variant="outline" className="border-blue-500 text-blue-400">
                          {category}
                        </Badge>
                        <span className="text-gray-400 text-sm">({categoryFaqs.length})</span>
                      </h3>
                      <Accordion type="single" collapsible className="space-y-2">
                        {categoryFaqs.map((faq) => (
                          <AccordionItem
                            key={faq.id}
                            value={faq.id}
                            className="bg-gray-800 border-gray-700 rounded-lg px-4"
                          >
                            <AccordionTrigger className="text-white hover:text-blue-400 text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* External Links */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">University Resources</CardTitle>
            <CardDescription className="text-gray-400">
              Quick access to essential university and academic resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {externalLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Card key={index} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-white">{link.title}</h4>
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                              {link.category}
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-sm mb-3">{link.description}</p>
                          <Button
                            onClick={() => window.open(link.url, '_blank')}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Visit Site
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportPage;

