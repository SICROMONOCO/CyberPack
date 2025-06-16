import React from 'react';
import { Download, ExternalLink, Calendar, FileText, Video, Link as LinkIcon, User, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ResourceCardProps {
  resource: {
    id: string;
    title: string;
    description: string;
    type: 'pdf' | 'video' | 'link' | 'document' | 'presentation' | 'image';
    url?: string;
    fileSize?: string;
    dateAdded: string;
    lastUpdated?: string;
    author?: string;
    keywords?: string[];
    language?: string;
  };
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
      case 'presentation':
        return <FileText className="w-6 h-6" />;
      case 'video':
        return <Video className="w-6 h-6" />;
      case 'link':
        return <LinkIcon className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-600 text-red-100';
      case 'video':
        return 'bg-purple-600 text-purple-100';
      case 'link':
        return 'bg-blue-600 text-blue-100';
      case 'document':
        return 'bg-green-600 text-green-100';
      case 'presentation':
        return 'bg-orange-600 text-orange-100';
      case 'image':
        return 'bg-pink-600 text-pink-100';
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

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Type Icon */}
          <div
            className={`inline-flex items-center justify-center rounded-lg ${getTypeColor(resource.type)}`}
            style={{ width: '2.5rem', height: '2.5rem', minWidth: '2.5rem', minHeight: '2.5rem', padding: 0 }}
          >
            {getTypeIcon(resource.type)}
          </div>
          
          {/* Content */}
          <div className="flex-1 space-y-3">
            {/* Header with Title and Action Button */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold text-white">
                  {resource.title}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge className={`${getTypeColor(resource.type)} text-xs px-2 py-1`}>
                    {resource.type.toUpperCase()}
                  </Badge>
                  {resource.fileSize && (
                    <span className="text-sm text-gray-400">
                      {resource.fileSize}
                    </span>
                  )}
                </div>
              </div>
              
              <Button
                onClick={handleAction}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
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
            </div>
            
            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
              {resource.description}
            </p>
            
            {/* Metadata */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Added: {new Date(resource.dateAdded).toLocaleDateString()}</span>
              </div>
              
              {resource.author && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <User className="w-4 h-4" />
                  <span>Author: {resource.author}</span>
                </div>
              )}
              
              {/* Keywords */}
              {resource.keywords && resource.keywords.length > 0 && (
                <div className="flex items-start gap-2">
                  <Tag className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="flex flex-wrap gap-1">
                    {resource.keywords.slice(0, 3).map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                        {keyword}
                      </Badge>
                    ))}
                    {resource.keywords.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                        +{resource.keywords.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
