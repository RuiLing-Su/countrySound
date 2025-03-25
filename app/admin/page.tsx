"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Check, X, Home, PlayCircle, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("admin")
  const [file, setFile] = useState<File | null>(null)
  const [audioName, setAudioName] = useState("")
  const [audioDescription, setAudioDescription] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) {
      return
    }

    // 检查文件类型
    if (!selectedFile.type.startsWith("audio/")) {
      setError("请选择音频文件")
      setFile(null)
      return
    }

    setFile(selectedFile)
    setError("")

    // 如果用户没有输入名称，使用文件名（不带扩展名）
    if (!audioName) {
      const fileName = selectedFile.name.split(".").slice(0, -1).join(".")
      setAudioName(fileName)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("请选择音频文件")
      return
    }

    if (!audioName.trim()) {
      setError("请输入音频名称")
      return
    }

    if (!selectedRegion) {
      setError("请选择地区")
      return
    }

    setUploading(true)
    setError("")

    try {
      // 模拟上传到后端
      // 在实际应用中，这里应该使用 FormData 和 fetch 或 axios 上传到后端
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // 模拟成功响应
      setUploadSuccess(true)

      // 重置表单
      setTimeout(() => {
        setFile(null)
        setAudioName("")
        setAudioDescription("")
        setSelectedRegion("")
        setUploading(false)
        setUploadSuccess(false)
      }, 2000)
    } catch (err) {
      setError("上传失败，请重试")
      setUploading(false)
    }
  }

  const clearFile = () => {
    setFile(null)
    const fileInput = document.getElementById("audio-file") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* 顶部导航栏 */}
      <div className="bg-white py-3 px-4 flex items-center shadow-sm">
        <button onClick={() => router.push("/")} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">后台管理</h1>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-auto pb-16 p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">上传新的声音</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="region-select">选择地区</Label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="选择地区" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chengdu">成都</SelectItem>
                  <SelectItem value="shanghai">上海</SelectItem>
                  <SelectItem value="hongkong">香港</SelectItem>
                  <SelectItem value="shenyang">沈阳</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="audio-name">音频名称</Label>
              <Input
                id="audio-name"
                value={audioName}
                onChange={(e) => setAudioName(e.target.value)}
                placeholder="输入音频名称"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="audio-description">音频描述</Label>
              <Textarea
                id="audio-description"
                value={audioDescription}
                onChange={(e) => setAudioDescription(e.target.value)}
                placeholder="输入音频描述"
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="audio-file">音频文件</Label>
              <div className="mt-1">
                {!file ? (
                  <div className="flex items-center">
                    <Input
                      id="audio-file"
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("audio-file")?.click()}
                      className="w-full border-dashed border-2 h-20 flex flex-col items-center justify-center"
                    >
                      <Upload className="h-5 w-5 mb-1" />
                      <span className="text-sm">点击选择音频文件</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-slate-50 border rounded-md">
                    <div className="truncate">
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-gray-500 block">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={clearFile} className="h-8 w-8 rounded-full">
                      <X size={16} />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <Button onClick={handleUpload} disabled={!file || uploading || uploadSuccess} className="w-full">
              {uploading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  上传中...
                </span>
              ) : uploadSuccess ? (
                <span className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  上传成功
                </span>
              ) : (
                <span className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  上传音频
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-medium mb-4">已上传的声音</h2>

          <div className="space-y-3">
            {[
              { id: 1, name: "成都 - 锦里古街", region: "成都", date: "2023-05-15" },
              { id: 2, name: "上海 - 外滩江声", region: "上海", date: "2023-06-22" },
              { id: 3, name: "香港 - 维多利亚港", region: "香港", date: "2023-07-10" },
              { id: 4, name: "沈阳 - 故宫区域", region: "沈阳", date: "2023-08-05" },
            ].map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">
                    {item.region} · {item.date}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    编辑
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500">
                    删除
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
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

