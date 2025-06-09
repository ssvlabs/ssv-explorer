import { type Address } from "viem"



interface IndexPageProps {
  params: Promise<{ address: Address }>
}

export default async function IndexPage(props: IndexPageProps) {
  return <div>hi</div>
}
