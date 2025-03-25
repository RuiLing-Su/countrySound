"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Home, PlayCircle, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SoundsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("sounds")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [sounds, setSounds] = useState<any[]>([])

  useEffect(() => {
    // 模拟从后端获取声音列表
    const mockSounds = [
      { id: 1, name: "成都 - 锦里古街", region: "chengdu", category: "culture" },
      { id: 2, name: "成都 - 熊猫基地", region: "chengdu", category: "nature" },
      { id: 3, name: "上海 - 外滩江声", region: "shanghai", category: "nature" },
      { id: 4, name: "上海 - 南京路", region: "shanghai", category: "street" },
      { id: 5, name: "香港 - 维多利亚港", region: "hongkong", category: "nature" },
      { id: 6, name: "香港 - 庙街夜市", region: "hongkong", category: "culture" },
      { id: 7, name: "沈阳 - 故宫区域", region: "shenyang", category: "culture" },
      { id: 8, name: "沈阳 - 工业区", region: "shenyang", category: "street" },
    ]

    // 模拟加载延迟
    const timer = setTimeout(() => {
      setSounds(mockSounds)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const filteredSounds = (category: string) => {
    return sounds
      .filter((sound) => sound.category === category)
      .filter((sound) => searchQuery === "" || sound.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* 顶部导航栏 */}
      <div className="bg-white py-3 px-4 text-center shadow-sm">
        <h1 className="text-lg font-medium">声音列表</h1>
      </div>

      {/* 搜索栏 */}
      <div className="p-4 bg-white shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="搜索声音..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-auto pb-16 p-4">
        <Tabs defaultValue="culture">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="culture">人文</TabsTrigger>
            <TabsTrigger value="nature">自然</TabsTrigger>
            <TabsTrigger value="street">街道</TabsTrigger>
          </TabsList>

          <TabsContent value="culture">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSounds("culture").length > 0 ? (
                  filteredSounds("culture").map((sound) => (
                    <div
                      key={sound.id}
                      className="bg-white p-4 rounded-lg shadow-sm flex items-center"
                      onClick={() => router.push(`/region/${sound.region}`)}
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <PlayCircle className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">{sound.name}</div>
                        <div className="text-xs text-gray-500">人文声音</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">没有找到匹配的声音</div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="nature">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSounds("nature").length > 0 ? (
                  filteredSounds("nature").map((sound) => (
                    <div
                      key={sound.id}
                      className="bg-white p-4 rounded-lg shadow-sm flex items-center"
                      onClick={() => router.push(`/region/${sound.region}`)}
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <PlayCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium">{sound.name}</div>
                        <div className="text-xs text-gray-500">自然声音</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">没有找到匹配的声音</div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="street">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSounds("street").length > 0 ? (
                  filteredSounds("street").map((sound) => (
                    <div
                      key={sound.id}
                      className="bg-white p-4 rounded-lg shadow-sm flex items-center"
                      onClick={() => router.push(`/region/${sound.region}`)}
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <PlayCircle className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <div className="font-medium">{sound.name}</div>
                        <div className="text-xs text-gray-500">街道声音</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">没有找到匹配的声音</div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部标签栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        <button
          onClick={() => {
            setActiveTab("home")
            router.push("/")
          }}
          className={`flex flex-col items-center ${activeTab === "home" ? "text-blue-500" : "text-gray-500"}`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">首页</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("sounds")
            router.push("/sounds")
          }}
          className={`flex flex-col items-center ${activeTab === "sounds" ? "text-blue-500" : "text-gray-500"}`}
        >
          <PlayCircle size={20} />
          <span className="text-xs mt-1">声音</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("admin")
            router.push("/admin")
          }}
          className={`flex flex-col items-center ${activeTab === "admin" ? "text-blue-500" : "text-gray-500"}`}
        >
          <Settings size={20} />
          <span className="text-xs mt-1">管理</span>
        </button>
      </div>
    </div>
  )
}

