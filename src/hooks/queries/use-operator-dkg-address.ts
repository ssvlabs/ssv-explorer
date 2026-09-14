"use client"

import { checkOperatorDKGHealth } from "@/api/operator"
import { useQuery } from "@tanstack/react-query"

import { globals } from "@/config/globals"
import { isVersionGTE } from "@/lib/utils/version"
import { useNetworkParam } from "@/hooks/app/useNetworkParam"

/**
 * TEMPORARY: gates the operator's DKG endpoint behind its node version.
 *
 * The address is only revealed for operators whose DKG node reports
 * >= `MIN_DKG_VERSION_FOR_ADDRESS`; everything else renders the placeholder.
 * Fails closed — an error, an unreachable node (`version: null`), an older
 * version or a request still in flight all resolve to the placeholder, so the
 * real endpoint never flashes while loading.
 *
 * Remove this hook once every operator has upgraded.
 */
export const useOperatorDkgAddress = (operator: {
  id: number
  dkg_address: string
}) => {
  const network = useNetworkParam()

  // Nothing to probe when there is no address, or when the API is still
  // masking it server-side (the placeholder is not a reachable node).
  const isProbeable =
    Boolean(operator.dkg_address) &&
    operator.dkg_address !== globals.MASKED_DKG_ADDRESS

  const query = useQuery({
    queryKey: [
      "operator-dkg-health",
      network,
      operator.id,
      operator.dkg_address,
    ],
    queryFn: () =>
      checkOperatorDKGHealth(network, [
        { id: String(operator.id), address: operator.dkg_address },
      ]),
    enabled: isProbeable,
    staleTime: 60 * 1000,
    retry: false,
  })

  const version = query.data?.[0]?.version
  const isUpgraded =
    isProbeable &&
    isVersionGTE(version ?? undefined, globals.MIN_DKG_VERSION_FOR_ADDRESS)

  return {
    ...query,
    // An empty dkg_address also resolves to the placeholder rather than the
    // previous "N/A" — pending product confirmation. Returning "" here instead
    // restores the old rendering, the component still falls back to "N/A".
    dkgAddress: isUpgraded ? operator.dkg_address : globals.MASKED_DKG_ADDRESS,
    isUpgraded,
  }
}
