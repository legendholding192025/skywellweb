"use client"

import React, { useState, useRef, useEffect } from "react"
import { Check, ChevronDown, Search } from "lucide-react"
import { useTheme } from "next-themes"

interface CountryData {
  code: string
  country: string
  flag: string
  dialCode: string
}

// Comprehensive list of countries with flags and dial codes
const countries: CountryData[] = [
  { code: "af", country: "Afghanistan", flag: "🇦🇫", dialCode: "+93" },
  { code: "al", country: "Albania", flag: "🇦🇱", dialCode: "+355" },
  { code: "dz", country: "Algeria", flag: "🇩🇿", dialCode: "+213" },
  { code: "as", country: "American Samoa", flag: "🇦🇸", dialCode: "+1684" },
  { code: "ad", country: "Andorra", flag: "🇦🇩", dialCode: "+376" },
  { code: "ao", country: "Angola", flag: "🇦🇴", dialCode: "+244" },
  { code: "ai", country: "Anguilla", flag: "🇦🇮", dialCode: "+1264" },
  { code: "ag", country: "Antigua and Barbuda", flag: "🇦🇬", dialCode: "+1268" },
  { code: "ar", country: "Argentina", flag: "🇦🇷", dialCode: "+54" },
  { code: "am", country: "Armenia", flag: "🇦🇲", dialCode: "+374" },
  { code: "aw", country: "Aruba", flag: "🇦🇼", dialCode: "+297" },
  { code: "au", country: "Australia", flag: "🇦🇺", dialCode: "+61" },
  { code: "at", country: "Austria", flag: "🇦🇹", dialCode: "+43" },
  { code: "az", country: "Azerbaijan", flag: "🇦🇿", dialCode: "+994" },
  { code: "bs", country: "Bahamas", flag: "🇧🇸", dialCode: "+1242" },
  { code: "bh", country: "Bahrain", flag: "🇧🇭", dialCode: "+973" },
  { code: "bd", country: "Bangladesh", flag: "🇧🇩", dialCode: "+880" },
  { code: "bb", country: "Barbados", flag: "🇧🇧", dialCode: "+1246" },
  { code: "by", country: "Belarus", flag: "🇧🇾", dialCode: "+375" },
  { code: "be", country: "Belgium", flag: "🇧🇪", dialCode: "+32" },
  { code: "bz", country: "Belize", flag: "🇧🇿", dialCode: "+501" },
  { code: "bj", country: "Benin", flag: "🇧🇯", dialCode: "+229" },
  { code: "bm", country: "Bermuda", flag: "🇧🇲", dialCode: "+1441" },
  { code: "bt", country: "Bhutan", flag: "🇧🇹", dialCode: "+975" },
  { code: "bo", country: "Bolivia", flag: "🇧🇴", dialCode: "+591" },
  { code: "ba", country: "Bosnia and Herzegovina", flag: "🇧🇦", dialCode: "+387" },
  { code: "bw", country: "Botswana", flag: "🇧🇼", dialCode: "+267" },
  { code: "br", country: "Brazil", flag: "🇧🇷", dialCode: "+55" },
  { code: "bn", country: "Brunei Darussalam", flag: "🇧🇳", dialCode: "+673" },
  { code: "bg", country: "Bulgaria", flag: "🇧🇬", dialCode: "+359" },
  { code: "bf", country: "Burkina Faso", flag: "🇧🇫", dialCode: "+226" },
  { code: "bi", country: "Burundi", flag: "🇧🇮", dialCode: "+257" },
  { code: "kh", country: "Cambodia", flag: "🇰🇭", dialCode: "+855" },
  { code: "cm", country: "Cameroon", flag: "🇨🇲", dialCode: "+237" },
  { code: "ca", country: "Canada", flag: "🇨🇦", dialCode: "+1" },
  { code: "cv", country: "Cape Verde", flag: "🇨🇻", dialCode: "+238" },
  { code: "ky", country: "Cayman Islands", flag: "🇰🇾", dialCode: "+1345" },
  { code: "cf", country: "Central African Republic", flag: "🇨🇫", dialCode: "+236" },
  { code: "td", country: "Chad", flag: "🇹🇩", dialCode: "+235" },
  { code: "cl", country: "Chile", flag: "🇨🇱", dialCode: "+56" },
  { code: "cn", country: "China", flag: "🇨🇳", dialCode: "+86" },
  { code: "co", country: "Colombia", flag: "🇨🇴", dialCode: "+57" },
  { code: "km", country: "Comoros", flag: "🇰🇲", dialCode: "+269" },
  { code: "cg", country: "Congo", flag: "🇨🇬", dialCode: "+242" },
  { code: "cd", country: "Congo (DRC)", flag: "🇨🇩", dialCode: "+243" },
  { code: "ck", country: "Cook Islands", flag: "🇨🇰", dialCode: "+682" },
  { code: "cr", country: "Costa Rica", flag: "🇨🇷", dialCode: "+506" },
  { code: "hr", country: "Croatia", flag: "🇭🇷", dialCode: "+385" },
  { code: "cu", country: "Cuba", flag: "🇨🇺", dialCode: "+53" },
  { code: "cy", country: "Cyprus", flag: "🇨🇾", dialCode: "+357" },
  { code: "cz", country: "Czech Republic", flag: "🇨🇿", dialCode: "+420" },
  { code: "dk", country: "Denmark", flag: "🇩🇰", dialCode: "+45" },
  { code: "dj", country: "Djibouti", flag: "🇩🇯", dialCode: "+253" },
  { code: "dm", country: "Dominica", flag: "🇩🇲", dialCode: "+1767" },
  { code: "do", country: "Dominican Republic", flag: "🇩🇴", dialCode: "+1" },
  { code: "ec", country: "Ecuador", flag: "🇪🇨", dialCode: "+593" },
  { code: "eg", country: "Egypt", flag: "🇪🇬", dialCode: "+20" },
  { code: "sv", country: "El Salvador", flag: "🇸🇻", dialCode: "+503" },
  { code: "gq", country: "Equatorial Guinea", flag: "🇬🇶", dialCode: "+240" },
  { code: "er", country: "Eritrea", flag: "🇪🇷", dialCode: "+291" },
  { code: "ee", country: "Estonia", flag: "🇪🇪", dialCode: "+372" },
  { code: "et", country: "Ethiopia", flag: "🇪🇹", dialCode: "+251" },
  { code: "fk", country: "Falkland Islands", flag: "🇫🇰", dialCode: "+500" },
  { code: "fo", country: "Faroe Islands", flag: "🇫🇴", dialCode: "+298" },
  { code: "fj", country: "Fiji", flag: "🇫🇯", dialCode: "+679" },
  { code: "fi", country: "Finland", flag: "🇫🇮", dialCode: "+358" },
  { code: "fr", country: "France", flag: "🇫🇷", dialCode: "+33" },
  { code: "gf", country: "French Guiana", flag: "🇬🇫", dialCode: "+594" },
  { code: "pf", country: "French Polynesia", flag: "🇵🇫", dialCode: "+689" },
  { code: "ga", country: "Gabon", flag: "🇬🇦", dialCode: "+241" },
  { code: "gm", country: "Gambia", flag: "🇬🇲", dialCode: "+220" },
  { code: "ge", country: "Georgia", flag: "🇬🇪", dialCode: "+995" },
  { code: "de", country: "Germany", flag: "🇩🇪", dialCode: "+49" },
  { code: "gh", country: "Ghana", flag: "🇬🇭", dialCode: "+233" },
  { code: "gi", country: "Gibraltar", flag: "🇬🇮", dialCode: "+350" },
  { code: "gr", country: "Greece", flag: "🇬🇷", dialCode: "+30" },
  { code: "gl", country: "Greenland", flag: "🇬🇱", dialCode: "+299" },
  { code: "gd", country: "Grenada", flag: "🇬🇩", dialCode: "+1473" },
  { code: "gp", country: "Guadeloupe", flag: "🇬🇵", dialCode: "+590" },
  { code: "gu", country: "Guam", flag: "🇬🇺", dialCode: "+1671" },
  { code: "gt", country: "Guatemala", flag: "🇬🇹", dialCode: "+502" },
  { code: "gn", country: "Guinea", flag: "🇬🇳", dialCode: "+224" },
  { code: "gw", country: "Guinea-Bissau", flag: "🇬🇼", dialCode: "+245" },
  { code: "gy", country: "Guyana", flag: "🇬🇾", dialCode: "+592" },
  { code: "ht", country: "Haiti", flag: "🇭🇹", dialCode: "+509" },
  { code: "hn", country: "Honduras", flag: "🇭🇳", dialCode: "+504" },
  { code: "hk", country: "Hong Kong", flag: "🇭🇰", dialCode: "+852" },
  { code: "hu", country: "Hungary", flag: "🇭🇺", dialCode: "+36" },
  { code: "is", country: "Iceland", flag: "🇮🇸", dialCode: "+354" },
  { code: "in", country: "India", flag: "🇮🇳", dialCode: "+91" },
  { code: "id", country: "Indonesia", flag: "🇮🇩", dialCode: "+62" },
  { code: "ir", country: "Iran", flag: "🇮🇷", dialCode: "+98" },
  { code: "iq", country: "Iraq", flag: "🇮🇶", dialCode: "+964" },
  { code: "ie", country: "Ireland", flag: "🇮🇪", dialCode: "+353" },
  { code: "il", country: "Israel", flag: "🇮🇱", dialCode: "+972" },
  { code: "it", country: "Italy", flag: "🇮🇹", dialCode: "+39" },
  { code: "jm", country: "Jamaica", flag: "🇯🇲", dialCode: "+1876" },
  { code: "jp", country: "Japan", flag: "🇯🇵", dialCode: "+81" },
  { code: "jo", country: "Jordan", flag: "🇯🇴", dialCode: "+962" },
  { code: "kz", country: "Kazakhstan", flag: "🇰🇿", dialCode: "+7" },
  { code: "ke", country: "Kenya", flag: "🇰🇪", dialCode: "+254" },
  { code: "ki", country: "Kiribati", flag: "🇰🇮", dialCode: "+686" },
  { code: "kp", country: "North Korea", flag: "🇰🇵", dialCode: "+850" },
  { code: "kr", country: "South Korea", flag: "🇰🇷", dialCode: "+82" },
  { code: "kw", country: "Kuwait", flag: "🇰🇼", dialCode: "+965" },
  { code: "kg", country: "Kyrgyzstan", flag: "🇰🇬", dialCode: "+996" },
  { code: "la", country: "Laos", flag: "🇱🇦", dialCode: "+856" },
  { code: "lv", country: "Latvia", flag: "🇱🇻", dialCode: "+371" },
  { code: "lb", country: "Lebanon", flag: "🇱🇧", dialCode: "+961" },
  { code: "ls", country: "Lesotho", flag: "🇱🇸", dialCode: "+266" },
  { code: "lr", country: "Liberia", flag: "🇱🇷", dialCode: "+231" },
  { code: "ly", country: "Libya", flag: "🇱🇾", dialCode: "+218" },
  { code: "li", country: "Liechtenstein", flag: "🇱🇮", dialCode: "+423" },
  { code: "lt", country: "Lithuania", flag: "🇱🇹", dialCode: "+370" },
  { code: "lu", country: "Luxembourg", flag: "🇱🇺", dialCode: "+352" },
  { code: "mo", country: "Macao", flag: "🇲🇴", dialCode: "+853" },
  { code: "mk", country: "North Macedonia", flag: "🇲🇰", dialCode: "+389" },
  { code: "mg", country: "Madagascar", flag: "🇲🇬", dialCode: "+261" },
  { code: "mw", country: "Malawi", flag: "🇲🇼", dialCode: "+265" },
  { code: "my", country: "Malaysia", flag: "🇲🇾", dialCode: "+60" },
  { code: "mv", country: "Maldives", flag: "🇲🇻", dialCode: "+960" },
  { code: "ml", country: "Mali", flag: "🇲🇱", dialCode: "+223" },
  { code: "mt", country: "Malta", flag: "🇲🇹", dialCode: "+356" },
  { code: "mh", country: "Marshall Islands", flag: "🇲🇭", dialCode: "+692" },
  { code: "mq", country: "Martinique", flag: "🇲🇶", dialCode: "+596" },
  { code: "mr", country: "Mauritania", flag: "🇲🇷", dialCode: "+222" },
  { code: "mu", country: "Mauritius", flag: "🇲🇺", dialCode: "+230" },
  { code: "mx", country: "Mexico", flag: "🇲🇽", dialCode: "+52" },
  { code: "fm", country: "Micronesia", flag: "🇫🇲", dialCode: "+691" },
  { code: "md", country: "Moldova", flag: "🇲🇩", dialCode: "+373" },
  { code: "mc", country: "Monaco", flag: "🇲🇨", dialCode: "+377" },
  { code: "mn", country: "Mongolia", flag: "🇲🇳", dialCode: "+976" },
  { code: "me", country: "Montenegro", flag: "🇲🇪", dialCode: "+382" },
  { code: "ms", country: "Montserrat", flag: "🇲🇸", dialCode: "+1664" },
  { code: "ma", country: "Morocco", flag: "🇲🇦", dialCode: "+212" },
  { code: "mz", country: "Mozambique", flag: "🇲🇿", dialCode: "+258" },
  { code: "mm", country: "Myanmar", flag: "🇲🇲", dialCode: "+95" },
  { code: "na", country: "Namibia", flag: "🇳🇦", dialCode: "+264" },
  { code: "nr", country: "Nauru", flag: "🇳🇷", dialCode: "+674" },
  { code: "np", country: "Nepal", flag: "🇳🇵", dialCode: "+977" },
  { code: "nl", country: "Netherlands", flag: "🇳🇱", dialCode: "+31" },
  { code: "nc", country: "New Caledonia", flag: "🇳🇨", dialCode: "+687" },
  { code: "nz", country: "New Zealand", flag: "🇳🇿", dialCode: "+64" },
  { code: "ni", country: "Nicaragua", flag: "🇳🇮", dialCode: "+505" },
  { code: "ne", country: "Niger", flag: "🇳🇪", dialCode: "+227" },
  { code: "ng", country: "Nigeria", flag: "🇳🇬", dialCode: "+234" },
  { code: "nu", country: "Niue", flag: "🇳🇺", dialCode: "+683" },
  { code: "no", country: "Norway", flag: "🇳🇴", dialCode: "+47" },
  { code: "om", country: "Oman", flag: "🇴🇲", dialCode: "+968" },
  { code: "pk", country: "Pakistan", flag: "🇵🇰", dialCode: "+92" },
  { code: "pw", country: "Palau", flag: "🇵🇼", dialCode: "+680" },
  { code: "ps", country: "Palestine", flag: "🇵🇸", dialCode: "+970" },
  { code: "pa", country: "Panama", flag: "🇵🇦", dialCode: "+507" },
  { code: "pg", country: "Papua New Guinea", flag: "🇵🇬", dialCode: "+675" },
  { code: "py", country: "Paraguay", flag: "🇵🇾", dialCode: "+595" },
  { code: "pe", country: "Peru", flag: "🇵🇪", dialCode: "+51" },
  { code: "ph", country: "Philippines", flag: "🇵🇭", dialCode: "+63" },
  { code: "pl", country: "Poland", flag: "🇵🇱", dialCode: "+48" },
  { code: "pt", country: "Portugal", flag: "🇵🇹", dialCode: "+351" },
  { code: "pr", country: "Puerto Rico", flag: "🇵🇷", dialCode: "+1" },
  { code: "qa", country: "Qatar", flag: "🇶🇦", dialCode: "+974" },
  { code: "re", country: "Réunion", flag: "🇷🇪", dialCode: "+262" },
  { code: "ro", country: "Romania", flag: "🇷🇴", dialCode: "+40" },
  { code: "ru", country: "Russia", flag: "🇷🇺", dialCode: "+7" },
  { code: "rw", country: "Rwanda", flag: "🇷🇼", dialCode: "+250" },
  { code: "kn", country: "Saint Kitts and Nevis", flag: "🇰🇳", dialCode: "+1869" },
  { code: "lc", country: "Saint Lucia", flag: "🇱🇨", dialCode: "+1758" },
  { code: "vc", country: "Saint Vincent", flag: "🇻🇨", dialCode: "+1784" },
  { code: "ws", country: "Samoa", flag: "🇼🇸", dialCode: "+685" },
  { code: "sm", country: "San Marino", flag: "🇸🇲", dialCode: "+378" },
  { code: "st", country: "Sao Tome and Principe", flag: "🇸🇹", dialCode: "+239" },
  { code: "sa", country: "Saudi Arabia", flag: "🇸🇦", dialCode: "+966" },
  { code: "sn", country: "Senegal", flag: "🇸🇳", dialCode: "+221" },
  { code: "rs", country: "Serbia", flag: "🇷🇸", dialCode: "+381" },
  { code: "sc", country: "Seychelles", flag: "🇸🇨", dialCode: "+248" },
  { code: "sl", country: "Sierra Leone", flag: "🇸🇱", dialCode: "+232" },
  { code: "sg", country: "Singapore", flag: "🇸🇬", dialCode: "+65" },
  { code: "sk", country: "Slovakia", flag: "🇸🇰", dialCode: "+421" },
  { code: "si", country: "Slovenia", flag: "🇸🇮", dialCode: "+386" },
  { code: "sb", country: "Solomon Islands", flag: "🇸🇧", dialCode: "+677" },
  { code: "so", country: "Somalia", flag: "🇸🇴", dialCode: "+252" },
  { code: "za", country: "South Africa", flag: "🇿🇦", dialCode: "+27" },
  { code: "ss", country: "South Sudan", flag: "🇸🇸", dialCode: "+211" },
  { code: "es", country: "Spain", flag: "🇪🇸", dialCode: "+34" },
  { code: "lk", country: "Sri Lanka", flag: "🇱🇰", dialCode: "+94" },
  { code: "sd", country: "Sudan", flag: "🇸🇩", dialCode: "+249" },
  { code: "sr", country: "Suriname", flag: "🇸🇷", dialCode: "+597" },
  { code: "sz", country: "Eswatini", flag: "🇸🇿", dialCode: "+268" },
  { code: "se", country: "Sweden", flag: "🇸🇪", dialCode: "+46" },
  { code: "ch", country: "Switzerland", flag: "🇨🇭", dialCode: "+41" },
  { code: "sy", country: "Syria", flag: "🇸🇾", dialCode: "+963" },
  { code: "tw", country: "Taiwan", flag: "🇹🇼", dialCode: "+886" },
  { code: "tj", country: "Tajikistan", flag: "🇹🇯", dialCode: "+992" },
  { code: "tz", country: "Tanzania", flag: "🇹🇿", dialCode: "+255" },
  { code: "th", country: "Thailand", flag: "🇹🇭", dialCode: "+66" },
  { code: "tl", country: "Timor-Leste", flag: "🇹🇱", dialCode: "+670" },
  { code: "tg", country: "Togo", flag: "🇹🇬", dialCode: "+228" },
  { code: "to", country: "Tonga", flag: "🇹🇴", dialCode: "+676" },
  { code: "tt", country: "Trinidad and Tobago", flag: "🇹🇹", dialCode: "+1868" },
  { code: "tn", country: "Tunisia", flag: "🇹🇳", dialCode: "+216" },
  { code: "tr", country: "Turkey", flag: "🇹🇷", dialCode: "+90" },
  { code: "tm", country: "Turkmenistan", flag: "🇹🇲", dialCode: "+993" },
  { code: "tv", country: "Tuvalu", flag: "🇹🇻", dialCode: "+688" },
  { code: "ug", country: "Uganda", flag: "🇺🇬", dialCode: "+256" },
  { code: "ua", country: "Ukraine", flag: "🇺🇦", dialCode: "+380" },
  { code: "ae", country: "United Arab Emirates", flag: "🇦🇪", dialCode: "+971" },
  { code: "gb", country: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { code: "us", country: "United States", flag: "🇺🇸", dialCode: "+1" },
  { code: "uy", country: "Uruguay", flag: "🇺🇾", dialCode: "+598" },
  { code: "uz", country: "Uzbekistan", flag: "🇺🇿", dialCode: "+998" },
  { code: "vu", country: "Vanuatu", flag: "🇻🇺", dialCode: "+678" },
  { code: "va", country: "Vatican City", flag: "🇻🇦", dialCode: "+379" },
  { code: "ve", country: "Venezuela", flag: "🇻🇪", dialCode: "+58" },
  { code: "vn", country: "Vietnam", flag: "🇻🇳", dialCode: "+84" },
  { code: "ye", country: "Yemen", flag: "🇾🇪", dialCode: "+967" },
  { code: "zm", country: "Zambia", flag: "🇿🇲", dialCode: "+260" },
  { code: "zw", country: "Zimbabwe", flag: "🇿🇼", dialCode: "+263" },
]

interface CountryPhoneSelectProps {
  value: string
  onChange: (value: string) => void
  className?: string
  error?: boolean
}

export function CountryPhoneSelect({ value, onChange, className, error }: CountryPhoneSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Find the selected country based on the dial code
  const selectedCountry = countries.find((country) => country.dialCode === value) || 
    countries.find(country => country.dialCode === "+971") || 
    countries[0]

  // Filter countries based on search query
  const filteredCountries = countries.filter(
    (country) =>
      country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery)
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isMounted) return;
    
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMounted])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center justify-between w-[110px] px-3 py-2 text-sm border rounded-md ${
          error ? "border-red-500" : isDark ? "border-gray-700" : "border-gray-300"
        } ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
        onClick={() => isMounted && setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="mr-2 text-lg">{selectedCountry.flag}</span>
          <span>{selectedCountry.dialCode}</span>
        </div>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && isMounted && (
        <div
          className={`absolute z-50 w-64 mt-1 overflow-hidden rounded-md shadow-lg ${
            isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
          }`}
        >
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search countries..."
                className={`w-full pl-8 pr-2 py-2 text-sm border rounded-md ${
                  isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.map((country) => (
              <div
                key={country.code}
                className={`flex items-center px-4 py-2 text-sm cursor-pointer ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } ${value === country.dialCode ? (isDark ? "bg-gray-700" : "bg-gray-100") : ""}`}
                onClick={() => {
                  onChange(country.dialCode)
                  setIsOpen(false)
                  setSearchQuery("")
                }}
              >
                <div className="flex items-center flex-1">
                  <span className="mr-2 text-lg">{country.flag}</span>
                  <span>{country.country}</span>
                </div>
                <span className="text-sm text-gray-500">{country.dialCode}</span>
                {value === country.dialCode && (
                  <Check className={`ml-2 h-4 w-4 ${isDark ? "text-white" : "text-gray-900"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 