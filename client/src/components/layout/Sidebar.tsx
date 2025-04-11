import { Link, useLocation } from "wouter";
import { useLibraries } from "@/hooks/useLibraries";
import { useCollections } from "@/hooks/useCollections";
import UserProfile from "./UserProfile";
import { cn } from "@/lib/utils";
import { Library, Collection } from "@/lib/types";
import { Plus } from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();
  const { data: libraries, isLoading: loadingLibraries } = useLibraries();
  const { data: collections, isLoading: loadingCollections } = useCollections();

  return (
    <aside className="bg-sidebar w-64 flex-shrink-0 h-full border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="bg-primary rounded-md p-1.5">
            <i className="fas fa-book-open text-white text-lg"></i>
          </div>
          <h1 className="text-xl font-bold text-white">Collaborative Bookshelf</h1>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold px-3 mb-3">Libraries</h2>
        <ul>
          {loadingLibraries ? (
            <li className="px-3 py-2 text-gray-400">Loading libraries...</li>
          ) : (
            libraries?.map((library: Library) => (
              <li key={library.id} className="mb-1">
                <Link href={`/bookshelf/${library.id}`}>
                  <span 
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md group",
                      location === `/bookshelf/${library.id}` 
                        ? "bg-primary text-white" 
                        : "text-gray-300 hover:bg-sidebar-hover"
                    )}
                  >
                    <i className={`fas fa-${library.icon} mr-3 ${location !== `/bookshelf/${library.id}` ? 'text-gray-400 group-hover:text-primary-light' : ''}`}></i>
                    <span>{library.name}</span>
                    <span 
                      className={cn(
                        "ml-auto text-xs px-2 py-0.5 rounded-full",
                        location === `/bookshelf/${library.id}` 
                          ? "bg-white text-primary" 
                          : "bg-primary-light text-white"
                      )}
                    >
                      {library.bookCount}
                    </span>
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>

        <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold px-3 mt-6 mb-3">Collections</h2>
        <ul>
          {loadingCollections ? (
            <li className="px-3 py-2 text-gray-400">Loading collections...</li>
          ) : (
            collections?.map((collection: Collection) => (
              <li key={collection.id} className="mb-1">
                <Link href="#">
                  <span className="flex items-center px-3 py-2 text-gray-300 hover:bg-sidebar-hover rounded-md group">
                    <i className="fas fa-tag mr-3 text-gray-400 group-hover:text-primary-light"></i>
                    <span>{collection.name}</span>
                    {collection.bookCount && (
                      <span className="ml-auto bg-gray-600 text-xs px-2 py-0.5 rounded-full">
                        {collection.bookCount}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))
          )}

          <li>
            <button className="flex items-center px-3 py-2 text-gray-400 hover:text-gray-200 w-full text-left hover:bg-sidebar-hover rounded-md">
              <Plus className="w-4 h-4 mr-2" />
              <span>Add Collection</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <UserProfile />
      </div>
    </aside>
  );
}