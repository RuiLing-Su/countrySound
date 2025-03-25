"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Check } from "lucide-react"

interface AudioUploaderProps {
  regionSlug: string
  onUploadSuccess: (audio: { id: string; name: string; url: string }) => void
}

export function AudioUploader({ regionSlug, onUploadSuccess }: AudioUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [audioName, setAudioName] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)

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

    setUploading(true)
    setError("")

    try {
      // 模拟上传到后端
      // 在实际应用中，这里应该使用 FormData 和 fetch 或 axios 上传到后端
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // 模拟成功响应
      const mockResponse = {
        id: Date.now().toString(),
        name: audioName,
        url: URL.createObjectURL(file), // 在实际应用中，这应该是后端返回的URL
      }

      onUploadSuccess(mockResponse)
      setUploadSuccess(true)

      // 重置表单
      setTimeout(() => {
        setFile(null)
        setAudioName("")
        setUploading(false)
        setUploadSuccess(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }, 2000)
    } catch (err) {
      setError("上传失败，请重试")
      setUploading(false)
    }
  }

  const clearFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="audio-name">音频名称</Label>
        <Input
          id="audio-name"
          value={audioName}
          onChange={(e) => setAudioName(e.target.value)}
          placeholder="输入音频名称"
          className="bg-slate-700 border-slate-600 text-white"
        />
      </div>

      <div>
        <Label htmlFor="audio-file">音频文件</Label>
        <div className="mt-1">
          {!file ? (
            <div className="flex items-center">
              <Input
                ref={fileInputRef}
                id="audio-file"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-dashed border-2 h-24 flex flex-col items-center justify-center bg-slate-700 border-slate-500 hover:bg-slate-600"
              >
                <Upload className="h-6 w-6 mb-2" />
                <span>点击选择音频文件</span>
                <span className="text-xs text-slate-400 mt-1">支持 MP3, WAV, OGG 等格式</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-slate-700 border border-slate-600 rounded-md">
              <div className="truncate">
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-xs text-slate-400 block">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
              <Button variant="ghost" size="icon" onClick={clearFile} className="h-8 w-8 rounded-full">
                <X size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>

      {error && <div className="text-red-400 text-sm">{error}</div>}

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
  )
}

