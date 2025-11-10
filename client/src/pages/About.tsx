import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Github, Linkedin, Mail } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function About() {
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
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Link>

        <div className="max-w-3xl mx-auto">
          {/* Profile Card */}
          <Card className="border-slate-200 dark:border-slate-800 mb-8">
            <CardHeader>
              <CardTitle className="text-3xl">关于我</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar & Bio */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">👨‍💻</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  欢迎！
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  我是一名热情的开发者和内容创作者
                </p>
              </div>

              {/* About Section */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  我的故事
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  欢迎来到我的个人博客！这是一个分享我的技术见解、学习笔记和生活感悟的地方。
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  我对全栈开发、开源项目和新技术充满热情。通过这个博客，我希望能够与大家分享知识，互相学习和成长。
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  如果您对我的文章感兴趣，欢迎在评论区留言，或者通过下面的方式与我联系。
                </p>
              </div>

              {/* Skills Section */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  技能与专长
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "React & TypeScript",
                    "Node.js & Express",
                    "数据库设计",
                    "全栈开发",
                    "Web 性能优化",
                    "开源贡献",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-900 dark:text-blue-100 font-medium text-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  联系我
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  欢迎通过以下方式与我联系：
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:contact@example.com"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    邮件
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
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
