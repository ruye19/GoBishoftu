"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, Hotel, Building, Camera, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/app/context/LanguageContext";
import { t } from "@/locales";

// Import data
import accommodations from "@/data/accommodations.json";
import attractionsData from "@/data/attractions.json";
import investments from "@/data/investments.json";

// Quick search categories
const SEARCH_CATEGORIES = [
  { icon: Hotel, label: "Hotels", type: "accommodation" },
  { icon: Building, label: "Attractions", type: "attraction" },
  { icon: Camera, label: "Investments", type: "investment" },
];

export function GlobalSearch({ className }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Check if search is open from URL params
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setQuery(search);
      setIsOpen(true);
      performSearch(search);
    }
  }, [searchParams]);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search across all data
  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const searchTerm = searchQuery.toLowerCase().trim();

    try {
      const searchResults = [];

      // Search accommodations
      accommodations.forEach((item) => {
        const title = item.translations?.[lang]?.title || item.translations?.en?.title || item.name || '';
        const description = item.translations?.[lang]?.description || item.translations?.en?.description || '';
        
        if (title.toLowerCase().includes(searchTerm) || 
            description.toLowerCase().includes(searchTerm) ||
            item.name?.toLowerCase().includes(searchTerm)) {
          searchResults.push({
            id: item.id,
            title: title,
            description: description.substring(0, 100) + '...',
            image: item.image,
            type: 'accommodation',
            category: item.type,
            url: `/${lang}/accommodations#${item.id}`,
            rating: item.rating
          });
        }
      });

      // Search attractions
      attractionsData.forEach((item) => {
        const title = item.translations?.[lang]?.title || item.translations?.en?.title || item.name || '';
        const description = item.translations?.[lang]?.description || item.translations?.en?.description || '';
        
        if (title.toLowerCase().includes(searchTerm) || 
            description.toLowerCase().includes(searchTerm) ||
            item.name?.toLowerCase().includes(searchTerm)) {
          searchResults.push({
            id: item.id,
            title: title,
            description: description.substring(0, 100) + '...',
            image: item.image,
            type: 'attraction',
            category: item.category,
            url: `/${lang}/explore#${item.id}`,
            rating: item.rating
          });
        }
      });

      // Search investments
      investments.forEach((item) => {
        const title = item.translations?.[lang]?.title || item.translations?.en?.title || item.name || '';
        const description = item.translations?.[lang]?.description || item.translations?.en?.description || '';
        
        if (title.toLowerCase().includes(searchTerm) || 
            description.toLowerCase().includes(searchTerm) ||
            item.name?.toLowerCase().includes(searchTerm)) {
          searchResults.push({
            id: item.id,
            title: title,
            description: description.substring(0, 100) + '...',
            image: item.image,
            type: 'investment',
            category: 'investment',
            url: `/${lang}/investment#${item.id}`,
            roi: item.roi,
            investmentAmount: item.investmentAmount
          });
        }
      });

      setResults(searchResults.slice(0, 8)); // Limit to 8 results
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, lang]);

  const handleResultClick = (result) => {
    setIsOpen(false);
    setQuery("");
    // Navigate to the result URL
    router.push(result.url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'accommodation':
        return <Hotel className="w-4 h-4" />;
      case 'attraction':
        return <Camera className="w-4 h-4" />;
      case 'investment':
        return <Building className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'accommodation':
        return t('accommodationType.hotel', lang);
      case 'attraction':
        return t('attractionsTitle', lang);
      case 'investment':
        return t('investmentTitle', lang);
      default:
        return type;
    }
  };

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder={t('searchPlaceholder', lang)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="pl-10 pr-10 h-12 text-base bg-background border-border"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (query.trim().length >= 2 || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
          
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">{t('loading', lang) || 'Loading...'}</span>
            </div>
          )}

          {/* Results */}
          {!isLoading && results.length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 flex items-start space-x-3 hover:bg-muted transition-colors border-b border-border last:border-b-0"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    {result.image ? (
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {getTypeIcon(result.type)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      {getTypeIcon(result.type)}
                      <span className="text-xs text-muted-foreground uppercase">
                        {getTypeLabel(result.type)}
                      </span>
                      {result.rating && (
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-yellow-500">★</span>
                          <span className="text-xs text-muted-foreground">{result.rating}</span>
                        </div>
                      )}
                    </div>
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {result.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {result.description}
                    </p>
                    {result.roi && (
                      <p className="text-xs text-green-600 mt-1">
                        ROI: {result.roi}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && query.trim().length >= 2 && results.length === 0 && (
            <div className="py-8 text-center">
              <MapPin className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">{t('noResults', lang)}</p>
            </div>
          )}

          {/* Quick Categories */}
          {!isLoading && query.trim().length < 2 && (
            <div className="p-4 border-t border-border">
              <p className="text-sm font-medium text-muted-foreground mb-3">
                {t('exploreAll', lang)}
              </p>
              <div className="flex flex-wrap gap-2">
                {SEARCH_CATEGORIES.map((category) => (
                  <Button
                    key={category.type}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const route = category.type === 'accommodation' 
                        ? `/${lang}/accommodations`
                        : category.type === 'attraction'
                        ? `/${lang}/explore`
                        : `/${lang}/investment`;
                      router.push(route);
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-1 text-xs"
                  >
                    <category.icon className="w-3 h-3" />
                    <span>{category.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
