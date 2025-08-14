import AppLogo from "@/components/global/app-logo"
import { Facebook, Github, Linkedin, Twitter } from "@/components/icons"
import { TextHoverEffect } from "@/components/registry/text-hover-effect"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FOOTER_NAV_MIDDLE_ITEMS, FOOTER_NAV_TERMS_ITEMS } from "@/constants/landing"
import Link from "next/link"

const SOCIAL_LINKS = [
  {
    id: 1,
    label: "Twitter",
    icon: <Twitter style={{ width: 20, height: "auto" }} />,
    path: "#",
  },
  {
    id: 2,
    label: "Facebook",
    icon: <Facebook style={{ width: 30, height: "auto" }} />,
    path: "#",
  },
  {
    id: 3,
    label: "GitHub",
    icon: <Github style={{ width: 28, height: "auto" }} />,
    path: "#",
  },
  {
    id: 4,
    label: "LinkedIn",
    icon: <Linkedin style={{ width: 30, height: "auto" }} />,
    path: "#",
  },
]

const FooterSection = () => {
  return (
    <footer className="relative z-10 px-6 md:px-12 lg:px-20 py-16 border-t border-primary/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-1">
            <AppLogo />
          </div>
          <p className="text-sm text-muted-foreground">© 2025 Konvo. All rights reserved.</p>
          <div className="flex gap-4 items-center mt-8">
            {SOCIAL_LINKS.map(link => (
              <Link href={link.path} key={link.id} className="hover:text-primary transition">
                <span className="sr-only">{link.label}</span>
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Middle Links */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <Label>Support</Label>
            <ul className="space-y-2 text-muted-foreground">
              {FOOTER_NAV_MIDDLE_ITEMS.map(link => (
                <li key={link.id}>
                  <Link href={link.path} className="hover:text-primary hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <Label>Company</Label>
            <ul className="space-y-2 text-muted-foreground">
              {FOOTER_NAV_TERMS_ITEMS.map(link => (
                <li key={link.id}>
                  <Link href={link.path} className="hover:text-primary hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <Label htmlFor="subscribe">Subscribe to our newsletter</Label>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input id="subscribe" placeholder="Enter your email" />
            <Button className="w-full sm:w-auto">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Hover Effect Logo */}
      <TextHoverEffect text="KONVO" automatic />
    </footer>
  )
}

export default FooterSection
