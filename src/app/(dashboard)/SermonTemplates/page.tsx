'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, ArrowLeft } from 'lucide-react'
import linesBg from './/images/lines-bg.png'


interface TemplateCardProps {
  title: string
  description: string
  templateNumber: number
  onClick: (templateId: number) => void 
}

function TemplateCard({ title, description, templateNumber, onClick }: TemplateCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <div
      className="relative rounded-xl shadow-lg bg-card-background text-white cursor-pointer"
      onClick={() => onClick(templateNumber)} // Handle card click
      ref={dropdownRef}
    >
      {/* Background image for the 'FAITH' watermark effect */}
      <div
        className="absolute inset-0 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url('/images/faith-bg.png')` }}
      />
      <div className="relative z-10 p-6 flex flex-col justify-between h-full rounded-lg">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm">{description}</p>
        </div>
        <div className="mt-4 relative">
          <button
            onClick={toggleDropdown}
            className="bg-button-active hover:bg-button-active/90 text-button-active-foreground rounded-lg px-4 py-2 flex items-center gap-2 focus:outline-none border border-white rounded-lg bg-[#F6805C]"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            Active
            <ChevronDown className="w-4 h-4" />
          </button>
          {isDropdownOpen && (
            <div className="absolute z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <div
                  onClick={(e) => { e.stopPropagation(); /* Handle View Details */ setIsDropdownOpen(false) }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                  role="menuitem"
                >
                  View Details
                </div>
                <div
                  onClick={(e) => { e.stopPropagation(); /* Handle Edit Template */ setIsDropdownOpen(false) }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                  role="menuitem"
                >
                  Edit Template
                </div>
                <div
                  onClick={(e) => { e.stopPropagation(); /* Handle Deactivate */ setIsDropdownOpen(false) }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                  role="menuitem"
                >
                  Deactivate
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// --- TemplateSection Component ---
interface TemplateSectionProps {
  title?: string
  content: string | string[] | { question: string }[]
  bgColorClass: string
  type?: 'text' | 'list' | 'input'
  layout?: 'full' | 'half'
  verse?: string
  quote?: string
}

function TemplateSection({ title, content, bgColorClass, type = 'text', layout = 'full', verse, quote }: TemplateSectionProps) {
  return (
    <div className={`rounded-xl shadow-md p-6 ${bgColorClass} text-gray-800`}>
      {title && <h3 className="text-lg font-semibold mb-2 text-black">{title}</h3>}
      {verse && <p className="text-lg font-semibold mb-1 text-black">{verse}</p>}
      {quote && <p className="text-sm italic mb-2 text-black">"{quote}"</p>}

      {type === 'text' && (
        Array.isArray(content) ? (
          content.map((paragraph, i) => (
            <p key={i} className="text-sm mb-2 last:mb-0 text-black">{paragraph}</p>
          ))
        ) : (
          <p className="text-sm text-black">{content}</p>
        )
      )}
      {type === 'list' && Array.isArray(content) && (
        <ol className="list-decimal list-inside text-sm space-y-1 text-black">
          {content.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      )}
      {type === 'input' && Array.isArray(content) && (
        <div className="space-y-3">
          {content.map((item: any, i) => (
            <input
              key={i}
              type="text"
              placeholder={item.question}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
      )}
    </div>
  )
}

// --- TemplateDetailView Component ---
interface TemplateDetailViewProps {
  template: TemplateData
  onBack: () => void
}

interface TemplateData {
  id: number
  title: string
  headerInfo: { label: string; value: string }[]
  sections: {
    title?: string
    content: string | string[] | { question: string }[]
    bgColorClass: string
    type?: 'text' | 'list' | 'input'
    layout?: 'full' | 'half'
    verse?: string
    quote?: string
  }[]
}

function TemplateDetailView({ template, onBack }: TemplateDetailViewProps) {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <button
        onClick={onBack}
        className="flex items-center text-[#794A3A] hover:text-[#E87C4D] mb-6 font-semibold"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Templates
      </button>
      <h1 className="text-[#794A3A] font-dm-sans text-[18px] font-semibold mb-3">
        {template.title}
      </h1>

      <div className="flex flex-wrap gap-2 mb-8 bg-[#F5F0FF]">
        {template.headerInfo.map((info, index) => (
          <span key={index} className="bg-template-orange text-black px-4 py-2 rounded-full text-sm text-black">
            {info.label} {info.value}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed to md:grid-cols-2 for two-column layout */}
        {template.sections.map((section, index) => (
          <div key={index} className={section.layout === 'half' ? 'md:col-span-1' : 'md:col-span-2 bg-[#F5F0FF] text-black'}> {/* Adjusted for half/full layout */}
            <TemplateSection {...section} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SermonTemplatesPage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null)

  const templates: TemplateData[] = [
    {
      id: 1,
      title: "Templates 1",
      headerInfo: [
        { label: "John", value: "3:16" },
        { label: "March", value: "15, 2024" },
        { label: "12", value: "minutes read" },
      ],
      sections: [
        {
          title: "Walking By Faith, Not By Sight",
          content: "In our journey of Faith, we often encounter moments where the path ahead seems unclear. Today's message explores how we can walk confidently with God even when we cannot see the full picture.",
          bgColorClass: "bg-red text-white",
        },
        {
          verse: "2 Corinthians 5:7",
          quote: "For we walk by faith, not by sight.",
          content: "", 
          bgColorClass: "bg-template-light-pink",
        },
        {
          title: "Main Message",
          content: [
            "Faith requires us to trust in God's promises even when circumstances suggest otherwise. Like Abraham, who left his homeland without knowing the destination, we are called to trust God's guidance.",
            "When we walk by faith, we acknowledge that God's wisdom surpasses our understanding. This doesn't mean we proceed blindly, but rather we move forward with confidence in God's character and promises.",
          ],
          bgColorClass: "bg-template-light-blue",
        },
        {
          title: "Reflection Questions",
          content: [
            "What areas of your life require more faith than sight right now?",
            "How has God proven His faithfulness in your past experiences?",
            "What steps can you take to strengthen your walk of faith?",
          ],
          type: "list",
          bgColorClass: "bg-template-orange text-white",
        },
        {
          title: "Closing Prayer",
          content: "Heavenly Father, strengthen our faith as we walk with You. Help us trust Your guidance even when the path ahead seems uncertain. May we find peace in Your presence and confidence in Your promises. In Jesus' name, Amen.",
          bgColorClass: "bg-template-light-pink",
        },
      ],
    },
    {
      id: 2,
      title: "Templates 2",
      headerInfo: [
        { label: "John", value: "3:16" },
        { label: "March", value: "15, 2024" },
        { label: "12", value: "minutes read" },
      ],
      sections: [
        {
          title: "Walking By Faith, Not By Sight",
          content: "In our journey of Faith, we often encounter moments where the path ahead seems unclear. Today's message explores how we can walk confidently with God even when we cannot see the full picture.",
          bgColorClass: "bg-template-light-purple",
          layout: "half",
        },
        {
          verse: "2 Corinthians 5:7",
          quote: "For we walk by faith, not by sight.",
          content: "", // Content is in quote
          bgColorClass: "bg-template-light-pink",
          layout: "half",
        },
        {
          title: "Main Message",
          content: [
            "Faith requires us to trust in God's promises even when circumstances suggest otherwise. Like Abraham, who left his homeland without knowing the destination, we are called to trust God's guidance.",
            "When we walk by faith, we acknowledge that God's wisdom surpasses our understanding. This doesn't mean we proceed blindly, but rather we move forward with confidence in God's character and promises.",
          ],
          bgColorClass: "bg-template-orange text-white",
        },
        {
          title: "Reflection Questions",
          content: [
            { question: "What areas of your life require more faith than sight right now?" },
            { question: "How has God proven His faithfulness in your past experiences?" },
            { question: "What steps can you take to strengthen your walk of faith?" },
          ],
          type: "input",
          bgColorClass: "bg-template-light-orange",
        },
        {
          title: "Closing Prayer",
          content: "Heavenly Father, strengthen our faith as we walk with You. Help us trust Your guidance even when the path ahead seems uncertain. May we find peace in Your presence and confidence in Your promises. In Jesus' name, Amen.",
          bgColorClass: "bg-template-light-blue",
        },
      ],
    },
    {
      id: 3,
      title: "Templates 3",
      headerInfo: [
        { label: "John", value: "3:16" },
        { label: "March", value: "15, 2024" },
        { label: "12", value: "minutes read" },
      ],
      sections: [
        {
          title: "Walking By Faith, Not By Sight",
          content: "In our journey of Faith, we often encounter moments where the path ahead seems unclear. Today's message explores how we can walk confidently with God even when we cannot see the full picture.",
          bgColorClass: "bg-template-orange text-white",
        },
        {
          verse: "2 Corinthians 5:7",
          quote: "For we walk by faith, not by sight.",
          content: "", // Content is in quote
          bgColorClass: "bg-template-light-pink",
        },
        {
          title: "Main Message",
          content: [
            "Faith requires us to trust in God's promises even when circumstances suggest otherwise. Like Abraham, who left his homeland without knowing the destination, we are called to trust God's guidance.",
            "When we walk by faith, we acknowledge that God's wisdom surpasses our understanding. This doesn't mean we proceed blindly, but rather we move forward with confidence in God's character and promises.",
          ],
          bgColorClass: "bg-template-light-blue",
        },
        {
          title: "Reflection Questions",
          content: [
            "What areas of your life require more faith than sight right now?",
            "How has God proven His faithfulness in your past experiences?",
            "What steps can you take to strengthen your walk of faith?",
          ],
          type: "list",
          bgColorClass: "bg-template-orange text-white",
        },
        {
          title: "Closing Prayer",
          content: "Heavenly Father, strengthen our faith as we walk with You. Help us trust Your guidance even when the path ahead seems uncertain. May we find peace in Your presence and confidence in Your promises. In Jesus' name, Amen.",
          bgColorClass: "bg-template-light-pink",
        },
      ],
    },
    // Add more templates here following the TemplateData interface
  ]

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId)

  return (
    <>
      {selectedTemplate ? (
        <TemplateDetailView template={selectedTemplate} onBack={() => setSelectedTemplateId(null)} />
      ) : (
        <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
          <h1 className="text-[#794A3A] font-dm-sans text-[18px] font-semibold mb-3">
            Sermon Templates
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                title={template.title}
                description="A message focusing on trusting God during trials." // Generic description for card view
                templateNumber={template.id}
                onClick={setSelectedTemplateId}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}