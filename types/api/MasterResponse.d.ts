﻿export interface MasterResponse {
  current_version: string;
  chains: Chains;
  metrics: Metrics;
  fee_metrics: FeeMetrics;
  default_chain_selection: string[];
  blockspace_categories: BlockspaceCategories;
}

export interface Chains {
  [key: string]: ChainInfo;
}

export interface ChainInfo {
  name: string;
  deployment: "PROD" | "DEV";
  name_short: string;
  description: string;
  symbol: string;
  bucket: string;
  da_layer: string;
  technology: string;
  purpose: string;
  launch_date: string;
  website: string;
  twitter: string;
  block_explorer: string;
  block_explorers: {
    [key: string]: string;
  };
  rhino_listed: boolean;
  rhino_naming: string;
  l2beat_stage: {
    stage: string;
    hex: string;
  };
  l2beat_link: string;
  raas: string;
  stack: {
    label: string;
    url: string;
  };
  enable_contracts: boolean;
}

export interface Metrics {
  [key: string]: MetricInfo;
}

export interface MetricInfo {
  name: string;
  metric_keys: string[];
  units: string[];
  avg: boolean;
  all_l2s_aggregate: string;
}

export interface FeeMetrics {
  txcosts_native_median: FeeSchema;
  txcosts_median: FeeSchema;
  tps: FeeSchema;
  throughput: FeeSchema;
  txcosts_swap: FeeSchema;
  txcosts_avg: FeeSchema;
}

export interface UnitSchema {
  currency: boolean;
  prefix: null | string;
  suffix: null | string;
  decimals: number;
  decimals_tooltip: number;
  agg: boolean;
  agg_tooltip: boolean;
}

export interface FeeSchema {
  name: string;
  units: { [key: string]: UnitSchema };
  currency: boolean;
  priority: number;
  invert_normalization: boolean;
}

export interface BlockspaceCategories {
  main_categories: MainCategories;
  sub_categories: SubCategories;
  mapping: BlockspaceCategoriesMapping;
}

export interface MainCategories {
  [key: string]: string;
}

export interface SubCategories {
  [key: string]: string;
}

export interface BlockspaceCategoriesMapping {
  [key: string]: string[];
}
