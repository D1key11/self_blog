import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Loader2, ArrowRight } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";
import { formatDate } from "@/lib/utils";

export default function Home() {
  const { data: posts, isLoading } = trpc.blog.posts.list.useQuery();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              {APP_LOGO && <img src={APP_LOGO} alt="Logo" className="h-8 w-8" />}
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{APP_TITLE}</h1>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
                首页
              </Link>
              <Link href="/about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
                关于我
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            欢迎来到我的博客
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            分享技术见解、生活感悟和创意想法。在这里，我记录学习的每一步。
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`} className="group block">
              <Card className="h-full hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    {post.publishedAt && formatDate(new Date(post.publishedAt))}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 line-clamp-3">
                    {post.excerpt || post.content.substring(0, 150)}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    阅读更多
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">暂无文章，敬请期待...</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-12">
        <div className="container mx-auto px-4 py-8 text-center text-slate-600 dark:text-slate-400">
          <p>&copy; 2025 {APP_TITLE}. 保留所有权利。</p>
        </div>
      </footer>
    </div>
  );
}
