import { AboutComponent } from '@/components/root/about-component'
import { HeroComponent } from '@/components/root/hero-component'

export default function Home() {
  return (
    <main>
      <HeroComponent />
      <AboutComponent />
    </main>
  )
}
