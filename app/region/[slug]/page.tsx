"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { AudioPlayer } from "@/components/audio-player"

const regionNames = {
  chengdu: "成都",
  shanghai: "上海",
  hongkong: "香港",
  shenyang: "沈阳",
}

const regionDescriptions = {
  chengdu:
    "成都是四川省省会，有着悠久的历史和丰富的文化。这里的声音景观包括茶馆里的谈笑声、锦里古街的吆喝声以及熊猫基地的自然声音。",
  shanghai:
    "上海是中国最大的城市之一，国际化大都市。这里的声音景观包括外滩的江水声、城市交通的喧嚣以及老弄堂里的市井生活声。",
  hongkong:
    "香港是国际金融中心，东西方文化交融之地。这里的声音景观包括维多利亚港的船笛声、繁忙街道的人声以及传统市场的吆喝声。",
  shenyang:
    "沈阳是辽宁省省会，历史悠久的工业城市。这里的声音景观包括故宫区域的古韵、工业区的机器声以及城市公园的自然声音。",
}

const regionImages = {
  chengdu: "/images/chengdu.jpg",
  shanghai: "/images/shanghai.jpg",
  hongkong: "/images/hongkong.jpg",
  shenyang: "/images/shenyang.jpg",
}

export default function RegionPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string

  const [audioFiles, setAudioFiles] = useState<Array<{ id: string; name: string; url: string; description: string }>>(
    [],
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟从后端获取音频文件列表
    const mockAudioFiles = [
      {
        id: "1",
        name: `${regionNames[slug] || slug} 街道声音`,
        url: "/audio/street.mp3",
        description: "繁忙的街道上，人们的交谈声、脚步声和城市的喧嚣交织在一起。",
      },
      {
        id: "2",
        name: `${regionNames[slug] || slug} 自然声音`,
        url: "/audio/nature.mp3",
        description: "城市公园里的鸟鸣声、风吹过树叶的沙沙声，以及远处的流水声。",
      },
      {
        id: "3",
        name: `${regionNames[slug] || slug} 人文声音`,
        url: "/audio/culture.mp3",
        description: "传统市场的吆喝声、街头艺人的表演声，以及当地特色活动的欢笑声。",
      },
    ]

    // 模拟加载延迟
    const timer = setTimeout(() => {
      setAudioFiles(mockAudioFiles)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [slug])

  if (!regionNames[slug]) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-100">
        <h1 className="text-xl mb-4">地区不存在</h1>
        <button onClick={() => router.push("/")} className="px-4 py-2 bg-blue-500 text-white rounded-full">
          返回首页
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* 顶部导航栏 */}
      <div className="bg-white py-3 px-4 flex items-center shadow-sm">
        <button onClick={() => router.push("/")} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">{regionNames[slug]} 声音景观</h1>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-auto pb-4">
        <div className="relative w-full h-48">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${regionImages[slug] || "/placeholder.svg?height=200&width=400"})`,
              filter: "brightness(0.7)",
            }}
          ></div>
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
            <h2 className="text-xl font-bold">{regionNames[slug]}</h2>
            <p className="text-sm mt-1 line-clamp-2">{regionDescriptions[slug]}</p>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-medium mb-3">声音列表</h3>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {audioFiles.map((audio) => (
                <div key={audio.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="p-3 border-b border-slate-100">
                    <h4 className="font-medium">{audio.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{audio.description}</p>
                  </div>
                  <AudioPlayer audio={audio} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

