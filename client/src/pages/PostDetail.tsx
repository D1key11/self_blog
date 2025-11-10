import { useParams, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, MessageCircle } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = trpc.blog.posts.bySlug.useQuery({ slug: slug || "" });
  const { data: comments } = trpc.blog.comments.byPostId.useQuery(
    { postId: post?.id || 0 },
    { enabled: !!post?.id }
  );
  const { user } = useAuth();
  const [commentContent, setCommentContent] = useState("");
  const createCommentMutation = trpc.blog.comments.create.useMutation();

  const handleSubmitComment = async () => {
    if (!commentContent.trim() || !post) return;
    await createCommentMutation.mutateAsync({
      postId: post.id,
      content: commentContent,
    });
    setCommentContent("");
  };

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
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : post ? (
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <Link href="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8">
              <ArrowLeft className="h-4 w-4" />
              返回首页
            </Link>

            {/* Article Card */}
            <Card className="border-slate-200 dark:border-slate-800 mb-8">
              <CardHeader>
                <CardTitle className="text-3xl mb-4">{post.title}</CardTitle>
                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 text-sm">
                  <span>{post.publishedAt && formatDate(new Date(post.publishedAt))}</span>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed">
                  {post.content}
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  评论区 ({comments?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Comment Form */}
                {user ? (
                  <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      评论为：{user.name || user.email}
                    </p>
                    <textarea
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      placeholder="分享您的想法..."
                      className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={4}
                    />
                    <div className="mt-3 flex gap-2">
                      <Button
                        onClick={handleSubmitComment}
                        disabled={!commentContent.trim() || createCommentMutation.isPending}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {createCommentMutation.isPending ? "提交中..." : "提交评论"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                      请登录后评论
                    </p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                      <a href={getLoginUrl()}>
                        登录
                      </a>
                    </Button>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                  {comments && comments.length > 0 ? (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"
                      >
                        <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                          用户 #{comment.userId}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 mb-2">{comment.content}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatDate(new Date(comment.createdAt))}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                      暂无评论，成为第一个评论者吧！
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">文章未找到</p>
          </div>
        )}
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
