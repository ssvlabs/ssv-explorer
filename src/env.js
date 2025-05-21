import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    SSV_NETWORKS: z
      .string()
      .default(
        '[{"networkId":560048,"apiVersion":"v4","apiNetwork":"hoodi","api":"https://api.stage.ops.ssvlabsinternal.com/api","explorerUrl":"https://hoodi.explorer.ssv.network","insufficientBalanceUrl":"https://faucet.ssv.network","googleTagSecret":"GTM-K3GR7M5","tokenAddress":"0x9F5d4Ec84fC4785788aB44F9de973cF34F7A038e","setterContractAddress":"0x58410Bef803ECd7E63B23664C586A6DB72DAf59c","getterContractAddress":"0x5AdDb3f1529C5ec70D77400499eE4bbF328368fe"}]'
      ),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_SSV_NETWORKS: z
      .string()
      .default(
        '[{"networkId":560048,"apiVersion":"v4","apiNetwork":"hoodi","api":"https://api.stage.ops.ssvlabsinternal.com/api","explorerUrl":"https://hoodi.explorer.ssv.network","insufficientBalanceUrl":"https://faucet.ssv.network","googleTagSecret":"GTM-K3GR7M5","tokenAddress":"0x9F5d4Ec84fC4785788aB44F9de973cF34F7A038e","setterContractAddress":"0x58410Bef803ECd7E63B23664C586A6DB72DAf59c","getterContractAddress":"0x5AdDb3f1529C5ec70D77400499eE4bbF328368fe"}]'
      ),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    SSV_NETWORKS: process.env.SSV_NETWORKS,
    NEXT_PUBLIC_SSV_NETWORKS: process.env.NEXT_PUBLIC_SSV_NETWORKS,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
