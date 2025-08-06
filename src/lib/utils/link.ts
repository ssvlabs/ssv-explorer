"use client"

import { chainNames } from "@/config/chains"

export const networkRegex = new RegExp(`(${chainNames.join("|")})`)
