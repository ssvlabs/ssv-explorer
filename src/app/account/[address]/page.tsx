import { Text } from "@/components/ui/text"
import { Shell } from "@/components/shell"

interface IndexPageProps {
  params: Promise<{ address: string }>
}

export default function IndexPage(props: IndexPageProps) {
  return (
    <Shell className="items-center justify-center gap-2 p-6 text-center">
      <Text variant="headline3" className="font-medium text-gray-800">
        🚧
      </Text>
      <Text variant="headline3" className="font-medium text-gray-800">
        Account page is under construction
      </Text>
      <Text className="max-w-sm text-gray-600">
        This page is currently under development and will be available soon.
        Thank you for your patience.
      </Text>
    </Shell>
  )
}
