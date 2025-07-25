import AppSidebar from "@/components/ui/Sidebar/AppSidebar";
import Divider from "@/components/ui/Divider";
import PostList from "@/components/Home/PostList";
import PostListFeatured from "@/components/Home/PostListFeatured";
import PostListPopular from "@/components/Home/PostListPopular";

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
          <AppSidebar />
        </div>
      </div>
    </div>
  );
}
