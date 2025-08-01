import BlogSidebar from "@/components/ui/Sidebar/BlogSidebar";
import Divider from "@/components/ui/Divider";
import PostList from "@/components/home/PostList";
import PostListFeatured from "@/components/home/PostListFeatured";
import PostListPopular from "@/components/home/PostListPopular";

export default function Home() {
  return (
    <div>
      <PostListFeatured />
      <Divider />

      <PostListPopular />
      <Divider />

      <div className="grid grid-cols-3 gap-8 mt-4">
        <div className="col-span-2">
          <PostList />
        </div>

        <div className="col-span-1">
          <BlogSidebar />
        </div>
      </div>
    </div>
  );
}
