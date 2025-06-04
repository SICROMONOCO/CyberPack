
import React from 'react';
import { Download, ExternalLink, Eye, Calendar, FileText, Video, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'link':
        return <LinkIcon className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
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
    if (resource.type === 'link' && resource.url) {
      window.open(resource.url, '_blank');
    } else {
      // For files, this would typically trigger a download
      console.log('Download/View resource:', resource.id);
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
              {getTypeIcon(resource.type)}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-white text-lg leading-tight truncate">
                {resource.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`${getTypeColor(resource.type)} text-xs`}>
                  {resource.type.toUpperCase()}
                </Badge>
                {resource.fileSize && (
                  <span className="text-xs text-gray-400">{resource.fileSize}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-gray-300 line-clamp-2">
          {resource.description}
        </CardDescription>
        
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            Added: {new Date(resource.dateAdded).toLocaleDateString()}
          </div>
          
          {resource.author && (
            <div className="flex items-center gap-2">
              <span>Author: {resource.author}</span>
            </div>
          )}
          
          {resource.keywords && resource.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {resource.keywords.slice(0, 3).map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                  {keyword}
                </Badge>
              ))}
              {resource.keywords.length > 3 && (
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                  +{resource.keywords.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleAction}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            {resource.type === 'link' ? (
              <>
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Link
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
