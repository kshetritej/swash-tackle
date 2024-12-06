import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import { Input } from './components/ui/input'
import axios from 'axios'

type FormData = {
  prompt: string
  about: string
}

export default function GPTWrapper() {
  const baseUrl = import.meta.env.VITE_API_URL
  const [response, setResponse] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const result = await axios.post(`${baseUrl}/ask`, {
        prompt: data.prompt,
        about: data.about
      }).then(res => res.data)
      const jsonResult = JSON.parse(result)
      setResponse(JSON.stringify(jsonResult, null, 2))
    } catch (error) {
      console.error('Error:', error)
      setResponse('An error occurred while generating the sample.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className='flex flex-col items-center justify-center mb-8'>
        <h1 className="text-3xl font-bold  text-center">Swash Tackle </h1>
        <h2>GPT API Request Sample Generator</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Prompt</CardTitle>
            <CardDescription>Enter your request sample to generate an realistic request sample</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                {...register("prompt", { required: "Prompt is required" })}
                placeholder="Paste your example value | schema here..."
                className="min-h-[200px] mb-4"
              />
              {errors.prompt && <p className="text-red-500 mb-4">{errors.prompt.message}</p>}
              <Input {...register("about")} placeholder="What does it relate to?" className="mb-4" />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Sample'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Payload Sample</CardTitle>
            <CardDescription>The generated sample will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto min-h-[200px] max-h-[400px]">
              {response || 'No sample generated yet.'}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

