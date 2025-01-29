import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, Dumbbell, LineChart, BookOpen, Layout } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('workout')
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <RootLayout>
      <div className="container mx-auto px-4 pb-20">
        <header className="py-4">
          <h1 className="text-2xl font-bold text-primary">Workout Tracker</h1>
          <div className={`text-sm ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="workout" className="mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="rounded-lg bg-card p-4 shadow-lg">
                <h2 className="text-xl font-semibold">Start Workout</h2>
                <p className="text-muted-foreground">Begin logging your exercises</p>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="exercises">
            <div className="grid gap-4">
              <h2 className="text-xl font-semibold">Exercise Library</h2>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Progress Tracking</h2>
            </div>
          </TabsContent>

          <TabsContent value="timer">
            <div className="flex flex-col items-center justify-center space-y-4">
              <h2 className="text-xl font-semibold">Rest Timer</h2>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Workout Templates</h2>
            </div>
          </TabsContent>
        </Tabs>

        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
          <TabsList className="flex justify-around p-2">
            <TabsTrigger value="workout" className="flex flex-col items-center p-2">
              <Dumbbell className="h-5 w-5" />
              <span className="text-xs">Workout</span>
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex flex-col items-center p-2">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">Exercises</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex flex-col items-center p-2">
              <LineChart className="h-5 w-5" />
              <span className="text-xs">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="timer" className="flex flex-col items-center p-2">
              <Timer className="h-5 w-5" />
              <span className="text-xs">Timer</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex flex-col items-center p-2">
              <Layout className="h-5 w-5" />
              <span className="text-xs">Templates</span>
            </TabsTrigger>
          </TabsList>
        </nav>
      </div>
    </RootLayout>
  )
}

export default App
