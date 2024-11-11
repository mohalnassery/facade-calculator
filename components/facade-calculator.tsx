"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  facadeType: z.string({
    required_error: "Please select a facade type.",
  }),
  width: z.string().min(1, "Width is required"),
  height: z.string().min(1, "Height is required"),
  quantity: z.string().min(1, "Quantity is required"),
  profileType: z.string({
    required_error: "Please select a profile type.",
  }),
  glassType: z.string({
    required_error: "Please select a glass type.",
  }),
})

const facadeTypes = [
  { value: "window", label: "Window" },
  { value: "door", label: "Door" },
  { value: "curtainWall", label: "Curtain Wall" },
  { value: "cladding", label: "Cladding" },
  { value: "skylight", label: "Skylight" },
]

const profileTypes = [
  { value: "standard", label: "Standard Profile" },
  { value: "thermal", label: "Thermal Break Profile" },
  { value: "structural", label: "Structural Profile" },
]

const glassTypes = [
  { value: "single", label: "Single Glazing" },
  { value: "double", label: "Double Glazing" },
  { value: "triple", label: "Triple Glazing" },
  { value: "laminated", label: "Laminated Glass" },
]

export function FacadeCalculator() {
  const { toast } = useToast()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facadeType: "",
      width: "",
      height: "",
      quantity: "1",
      profileType: "",
      glassType: "",
    },
  })

  function calculateCost(data: z.infer<typeof formSchema>) {
    const width = parseFloat(data.width)
    const height = parseFloat(data.height)
    const quantity = parseInt(data.quantity)
    
    // Basic area calculation
    const area = width * height * quantity
    
    // Base rates per square meter
    const rates = {
      window: 250,
      door: 300,
      curtainWall: 450,
      cladding: 200,
      skylight: 400,
    }
    
    // Profile multipliers
    const profileMultipliers = {
      standard: 1,
      thermal: 1.3,
      structural: 1.5,
    }
    
    // Glass multipliers
    const glassMultipliers = {
      single: 1,
      double: 1.6,
      triple: 2.2,
      laminated: 1.8,
    }
    
    // Calculate base cost
    const baseRate = rates[data.facadeType as keyof typeof rates]
    const profileMultiplier = profileMultipliers[data.profileType as keyof typeof profileMultipliers]
    const glassMultiplier = glassMultipliers[data.glassType as keyof typeof glassMultipliers]
    
    const totalCost = area * baseRate * profileMultiplier * glassMultiplier
    
    return {
      area,
      baseRate,
      profileMultiplier,
      glassMultiplier,
      totalCost: Math.round(totalCost * 100) / 100,
    }
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    const results = calculateCost(data)
    
    toast({
      title: "Cost Calculation Complete",
      description: (
        <div className="mt-2 space-y-2">
          <p>Total Area: {results.area} m²</p>
          <p>Base Rate: ${results.baseRate}/m²</p>
          <p>Profile Multiplier: {results.profileMultiplier}x</p>
          <p>Glass Multiplier: {results.glassMultiplier}x</p>
          <p className="font-bold">Total Cost: ${results.totalCost}</p>
        </div>
      ),
    })
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Facade Calculator
          </CardTitle>
          <CardDescription>
            Calculate costs for various facade solutions including windows, doors, and curtain walls.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="facadeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facade Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select facade type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {facadeTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width (m)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (m)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="profileType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select profile type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {profileTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="glassType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Glass Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select glass type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {glassTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                Calculate Cost
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}