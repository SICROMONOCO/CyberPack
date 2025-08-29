import React from 'react';
import { Download, ExternalLink, Calendar, FileText, Video, Link as LinkIcon, User, Tag, Copy, Clock, Globe, Eye, BookOpen, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface ResourceCardProps {
  resource: {
    id: string;
    title: string;
    description: string;
    type: 'link' | 'courses' | 'project' | 'tp' | 'td' | 'disabled' | 'exams';
    url?: string;
    fileSize?: string;
    dateAdded: string;
    lastUpdated?: string;
    author?: string;
    keywords?: string[];
    language?: string;
    subjectName?: string;
    branchName?: string;
    branchId?: string;
    semesterName?: string;
    semesterId?: string;
  };
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'link':
        return <LinkIcon className="w-6 h-6" />;
      case 'courses':
        return <BookOpen className="w-6 h-6" />;
      case 'project':
        return <Award className="w-6 h-6" />;
      case 'tp':
        return <FileText className="w-6 h-6" />;
      case 'td':
        return <FileText className="w-6 h-6" />;
      case 'exams':
        return <FileText className="w-6 h-6" />;
      case 'disabled':
        return <FileText className="w-6 h-6 opacity-40" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'link':
        return 'bg-blue-600 text-blue-100';
      case 'courses':
        return 'bg-green-600 text-green-100';
      case 'project':
        return 'bg-purple-600 text-purple-100';
      case 'tp':
        return 'bg-orange-600 text-orange-100';
      case 'td':
        return 'bg-pink-600 text-pink-100';
      case 'exams':
        return 'bg-yellow-600 text-yellow-100';
      case 'disabled':
        return 'bg-gray-700 text-gray-400 opacity-60';
      default:
        return 'bg-gray-600 text-gray-100';
    }
  };

  const handleAction = () => {
    if (resource.url) {
      // For files, trigger download; for links, open in new tab
      if (resource.type === 'link') {
        window.open(resource.url, '_blank');
      } else {
        // Create a temporary anchor to trigger download
        const a = document.createElement('a');
        a.href = resource.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.download = resource.title || '';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } else {
      // fallback
      console.log('No resource URL found:', resource.id);
    }
  };

  const handleCopyUrl = async () => {
    if (!resource.url) return;
    try {
      await navigator.clipboard.writeText(resource.url);
  toast({ title: 'Link copied', description: 'Resource URL copied to clipboard.' });
    } catch (e) {
  toast({ title: 'Copy failed', description: 'Could not copy URL to clipboard.' });
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Icon */}
          <div className={`inline-flex items-center justify-center rounded-lg ${getTypeColor(resource.type)} w-12 h-12 flex-shrink-0`}>
            {getTypeIcon(resource.type)} 
          </div>

          {/* Main content */} 
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">
                  {resource.title}
                </h3>

                {/* Small meta row: subject • branch • semester */}
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  {resource.subjectName && (
                    <span className="inline-flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{resource.subjectName}</span>
                    </span>
                  )}
                  {resource.branchName && (
                    <span className="text-gray-500">• {resource.branchName}</span>
                  )}
                  {resource.semesterName && (
                    <span className="text-gray-500">• {resource.semesterName}</span>
                  )}
                  {resource.language && (
                    <span className="inline-flex items-center gap-1 text-gray-400">
                      <Globe className="w-4 h-4" />
                      <span className="text-gray-300">{resource.language}</span>
                    </span>
                  )}
                  {resource.fileSize && (
                    <span className="ml-1 text-gray-400">• {resource.fileSize}</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col items-center sm:items-end gap-2 mt-3 sm:mt-0">
                <Button onClick={handleAction} className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto" size="sm">
                  {resource.type === 'link' ? (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </>
                  )}
                </Button>
                {resource.url && (
                  <button onClick={handleCopyUrl} title="Copy URL" className="p-2 rounded-md bg-gray-800 hover:bg-gray-750 w-full sm:w-auto">
                    <Copy className="w-4 h-4 text-gray-300" />
                  </button>
                )}
              </div>
            </div>

            {/* Description */}
            {resource.description && (
              <p className="mt-3 text-sm sm:text-sm text-gray-300 leading-relaxed">
                {resource.description}
              </p>
            )}

            {/* Tags / keywords */}
            {resource.keywords && resource.keywords.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {resource.keywords.slice(0, 6).map((k, i) => (
                  <Badge key={i} className="text-xs font-semibold bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg px-3 py-1 shadow-sm border-0">
                    {k}
                  </Badge>
                ))}
                {resource.keywords.length > 6 && (
                  <Badge className="text-xs font-semibold bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg px-3 py-1 shadow-sm border-0">+{resource.keywords.length - 6}</Badge>
                )}
              </div>
            )}

            {/* Footer metadata */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-400 gap-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Added: {new Date(resource.dateAdded).toLocaleDateString()}</span>
                </div>
                {resource.lastUpdated && (
                  <div className="inline-flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Updated: {new Date(resource.lastUpdated).toLocaleDateString()}</span>
                  </div>
                )}
                {resource.author && (
                  <div className="inline-flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{resource.author}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                {resource.type !== 'disabled' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-gray-800 text-gray-200">
                    {(() => {
                      switch (resource.type) {
                        case 'link': return 'Link';
                        case 'courses': return 'Courses';
                        case 'project': return 'Project';
                        case 'tp': return 'TP';
                        case 'td': return 'TD';
                        case 'exams': return 'Exams';
                        default: return resource.type;
                      }
                    })()}
                  </span>
                )}
                {resource.type === 'link' && (
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gray-300">
                    <Eye className="w-4 h-4" />
                    View
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
