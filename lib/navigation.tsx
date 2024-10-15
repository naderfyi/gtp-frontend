import { IS_PREVIEW } from "./helpers";
import { MasterURL } from "./urls";
import { MasterResponse } from "@/types/api/MasterResponse";
import Icon from "@/components/layout/Icon";
import { GTPIconName } from "@/icons/gtp-icon-names";

export type NavigationItem = {
  name: string;
  label: string;
  newChild?: boolean;
  page?: {
    title: string;
    description: string;
  };
  key?: string;
  icon: GTPIconName;
  options: {
    label: string;
    category?: string;
    page?: {
      title?: string;
      tags?: React.ReactNode[];
      description: string;
      note?: string | React.ReactNode;
      why?: string;
      icon?: GTPIconName;
      showGwei?: boolean;
      reversePerformer?: boolean;
    };
    icon: GTPIconName;
    key?: string;
    rootKey?: string;
    urlKey: string;
    excludeFromSitemap?: boolean;
    hide?: boolean;
    showNew?: boolean;
    url?: string;
  }[];
  href?: string;
};

export const navigationCategories = {
  activity: {
    label: "Activity",
    icon: "feather:clock",
    group: "fundamentals",
  },
  "value-locked": {
    label: "Value Locked",
    icon: "feather:star",
    group: "fundamentals",
  },
  business: {
    label: "Business",
    icon: "feather:briefcase",
    group: "fundamentals",
  },
  market: {
    label: "Market",
    icon: "feather:bar-chart-2",
    group: "fundamentals",
  },
  metrics: {
    label: "Metrics",
    icon: "feather:bar-chart-2",
    group: "fundamentals",
  },

  "blockspace-categories": {
    label: "Categories",
    icon: "package",
    group: "blockspace",
  },
  contracts: {
    label: "Contracts",
    icon: "package",
    group: "contracts",
  },
  developer: {
    label: "Developer",
    icon: "feather:code",
    group: "developer",
  },
  convenience: {
    label: "Convenience",
    icon: "transaction-costs",
    group: "fundamentals",
  },
  "public-goods-funding": {
    label: "Public Goods Funding",
    icon: "feather:sun",
    group: "trackers",
  },
  gtpmetrics: {
    label: "More from growthepie",
    icon: "gtp-pie-monochrome",
    group: "trackers",
  },
};

export const navigationItems: NavigationItem[] = [
  {
    name: "Fundamentals",
    label: "Fundamentals",
    key: "metrics",
    icon: "gtp-fundamentals",
    options: [
      {
        label: "Active Addresses",
        category: "activity",
        page: {
          title: "Active Addresses",
          description:
            "The number of distinct addresses that interacted with a chain.",
          why: "Active addresses is a widely used metric for estimating the number of users on a blockchain network. Although it is not a perfect metric due to the possibility of a single person owning multiple addresses, it can still provide valuable insights into the overall user base of a chain. It is worth noting, however, that this metric can be influenced by Sybil attacks, where an attacker creates a large number of fake identities to artificially inflate the active address count. Therefore, while daily active addresses can be a useful measure, it should be used in conjunction with other metrics to provide a more comprehensive analysis of a chain's user activity.",
          icon: "gtp-metrics-activeaddresses",
        },
        icon: "gtp-metrics-activeaddresses",
        key: "daa",
        rootKey: "metricsDailyActiveAddresses",
        urlKey: "daily-active-addresses",
        url: "/fundamentals/daily-active-addresses",
      },
      {
        label: "Transaction Count",
        category: "activity",
        page: {
          title: "Transaction Count",
          description:
            "The number of daily transactions. We try to only count transactions that are executed by users/smart contracts - no system transactions.",
          why: "The number of transactions processed on a blockchain is a reliable metric for measuring its usage. However, it should be noted that this metric alone may not provide sufficient insight into the actual value of the transactions being conducted. For instance, while some chains may have a lower transaction count, the value of these transactions may be significantly higher due to their use in decentralized finance (DeFi) applications. On the other hand, certain chains may have a higher transaction count due to their use in gaming or other applications involving lower value transactions.",
          icon: "gtp-metrics-transactioncount",
        },
        icon: "gtp-metrics-transactioncount",
        key: "txcount",
        rootKey: "metricsTxCount",
        urlKey: "transaction-count",
        url: "/fundamentals/transaction-count",
      },
      {
        label: "Throughput",
        category: "activity",
        page: {
          title: "Throughput",
          description:
            "A chains throughput measured in gas per second. We only include EVM equivalent Layer 2 gas usage.",
          why: "Throughput is a crucial metric for assessing scalability, reflecting a blockchain's actual compute capacity more accurately than transaction counts, which can vary in complexity (i.e. 21,000 gas for an eth transfer vs 280,000 gas for a simple Uniswap swap). Similarly to how modern storage devices are marketed with specs on read/write speeds rather than the number of files they can process, throughput provides a direct measure of a blockchain's ability to handle compute effectively. Throughput also reveals how close a chain is to its operational limits. This metric is essential for app developers and Layer 2 teams to gauge growth potential, potential cost implications, and performance constraints.",
          icon: "gtp-metrics-throughput",
        },
        icon: "gtp-metrics-throughput",
        key: "throughput",
        rootKey: "throughput",
        urlKey: "throughput",
        url: "/fundamentals/throughput",
      },
      {
        label: "Stablecoin Market Cap",
        category: "value-locked",
        page: {
          title: "Stablecoin Market Cap",
          description: "The sum of stablecoins that are locked on the chain.",
          why: "Stablecoin market cap is a crucial metric for evaluating the growth and development of a blockchain's decentralized finance (DeFi) ecosystem.Stables are a popular choice for use in DeFi applications such as lending, borrowing, and trading. The market cap of stablecoins on a particular chain can provide valuable insights into the level of adoption and usage of DeFi applications on the network. A high stablecoin market cap is indicative of a robust and thriving DeFi ecosystem, where users are actively engaged in utilizing the various financial applications available on the chain.",
          icon: "gtp-metrics-stablecoinmarketcap",
        },
        icon: "gtp-metrics-stablecoinmarketcap",
        key: "stables_mcap",
        rootKey: "metricsStablesMcap",
        urlKey: "stablecoin-market-cap",
        url: "/fundamentals/stablecoin-market-cap",
      },
      {
        label: "Total Value Locked",
        category: "value-locked",
        page: {
          title: "Total Value Locked",
          description:
            "The sum of all funds locked on the chain. Methodology and data is derived from L2Beat.com.",
          why: "TVL is a crucial metric for assessing the success of a blockchain. A high TVL indicates that users have significant trust in the chain's security and reliability, as well as confidence in the usefulness and functionality of the various applications available on the chain.",
          icon: "gtp-metrics-totalvaluelocked",
        },
        icon: "gtp-metrics-totalvaluelocked",
        key: "tvl",
        rootKey: "metricsTvl",
        urlKey: "total-value-locked",
        url: "/fundamentals/total-value-locked",
      },

      // // put navigation items that we want to hide in production here
      // ...(IS_PREVIEW
      //   ? [

      //     ]
      //   : []),

      {
        label: "Transaction Costs",
        category: "convenience",
        page: {
          title: "Transaction Costs",
          description: "The median amount that is paid per transaction.",
          note: (
            <>
              1 Billion <b className="font-semibold">Gwei</b> equals 1{" "}
              <b className="font-semibold">ETH</b>.
            </>
          ),
          why: "This is the amount that users pay per transaction. On EVM chains, transaction costs depend on the complexity of the transaction (which is measured in gas). A simple transaction, e.g. a native ETH transfer, uses less gas than a more complex transaction, e.g. an ERC20 swap. Hence, we calculated this metric by looking at the median transaction costs. IMX doesn't charge transaction costs.",
          icon: "transaction-costs",
          showGwei: true,
          reversePerformer: true,
        },
        icon: "gtp-metrics-transactioncosts",
        key: "txcosts",
        rootKey: "metricsTxCosts",
        urlKey: "transaction-costs",
        url: "/fundamentals/transaction-costs",
      },
    ],
  },
  {
    name: "Economics",
    label: "Economics",
    icon: "gtp-metrics-economics",
    newChild: true,
    options: [
      {
        label: "Overview",
        page: {
          title: "Overview",
          description: `Our Onchain Economics page breaks down how profitable L2s operate.`,
          icon: "gtp-overview",
        },
        icon: "gtp-overview",
        key: "economics-overview",
        rootKey: "economics",
        urlKey: "economics",
        url: "/economics",
        showNew: true,
      },
      {
        label: "Revenue",
        category: "business",
        page: {
          title: "Revenue",
          description:
            "The sum of fees that were paid by users of the chain in gas fees.",
          why: "Revenue is a critical metric for measuring a blockchain's adoption and is the sum of all gas fees paid by users. A high fee revenue can be an indication that users find the chain's applications and security valuable, and are willing to pay for it. The Revenue metric reflects the total amount of onchain income generated by the network.",
          icon: "gtp-metrics-feespaidbyusers",
        },
        icon: "gtp-metrics-feespaidbyusers",
        key: "fees",
        rootKey: "metricsFeesPaidToEthereum",
        urlKey: "fees-paid-by-users",
        url: "/fundamentals/fees-paid-by-users",
      },
      {
        label: "Rent Paid to L1",
        category: "business",
        page: {
          title: "Rent Paid to L1",
          description:
            "The gas fees paid by Layer 2s to post transaction data & verification states onto Ethereum. For data availability: Ethereum calldata and blobs are tracked here.",
          why: "Rent paid to L1 quantifies the expenses associated with posting L2 transaction data and proofs onto the Ethereum blockchain. The term 'rent' signifies the gas fees L2s incur to leverage the security of the Ethereum blockchain. This metric provides valuable insights into the value accrual for ETH holders.",
          icon: "gtp-metrics-rentpaidtol1",
        },
        icon: "gtp-metrics-rentpaidtol1",
        key: "rent_paid",
        rootKey: "metricsRentPaid",
        urlKey: "rent-paid",
        url: "/fundamentals/rent-paid",
      },
      {
        label: "Onchain Profit",
        category: "business",
        page: {
          title: "Onchain Profit",
          description:
            "The net profit of L2s, accounting for revenues as L2 gas fees collected and expenses as posting transaction data & verification states onto Ethereum.",
          why: "Onchain Profit is a key metric for assessing the financial viability of scaling solutions. It quantifies profitability by comparing the revenue generated from L2 gas fees collected to the costs associated with data & proof posting onto the Ethereum blockchain. L2 profitability can increases for two reasons: firstly, when there is high demand for L2 blockspace, enabling an auction of the available blockspace for a premium. Secondly, if the operator (who controls the sequencer) increases the base fee scalar. This metric can be used to gauge the health and success of Layer 2 solutions.",
          icon: "gtp-metrics-onchainprofit",
        },
        icon: "gtp-metrics-onchainprofit",
        key: "profit",
        rootKey: "metricsEarnings",
        urlKey: "profit",
        url: "/fundamentals/profit",
      },
      {
        label: "Fully Diluted Valuation",
        category: "market",
        page: {
          title: "Fully Diluted Valuation",
          description:
            "The Fully Diluted Valuation is the theoretical market cap of a token if all its planned tokens (total supply) were issued at the current price.",
          tags: [
            <div
              className="flex items-center space-x-1 font-inter text-lg"
              key="fdv-title-tags"
            >
              <span className="font-inter text-xs px-1.5 py-0.5 rounded bg-forest-900 dark:bg-forest-500 font-medium text-white dark:text-forest-1000">
                FDV
              </span>
              <div>=</div>
              <span className="font-inter text-xs px-1.5 py-[1px] rounded border border-forest-900 dark:border-forest-500 font-medium">
                Total Token Supply
              </span>
              <Icon
                className="text-forest-900 dark:text-forest-500 text-base"
                icon="feather:x"
              />
              <span className="font-inter text-xs px-1.5 py-[1px] rounded border border-forest-900 dark:border-forest-500 font-medium">
                Token Price
              </span>
            </div>,
          ],
          why: "FDV helps investors understand the potential size and value of a token, which can be useful for comparing similar assets and assessing the risk of dilution. Note: A token can be related to multiple chains (i.e. MATIC is connected to Polygon zkEVM and Polygon PoS)",
          icon: "gtp-metrics-fdv",
          showGwei: false,
        },
        icon: "gtp-metrics-fdv",
        key: "fdv",
        rootKey: "metricsFullyDilutedValuation",
        urlKey: "fully-diluted-valuation",
        url: "/fundamentals/fully-diluted-valuation",
      },
      {
        label: "Market Cap",
        category: "market",
        page: {
          title: "Market Cap",
          tags: [
            <div
              className="flex items-center space-x-1 font-inter text-lg"
              key="market-cap-title-tags"
            >
              <span className="font-inter text-xs px-1.5 py-0.5 rounded bg-forest-900 dark:bg-forest-500 font-medium text-white dark:text-forest-1000">
                MC
              </span>
              <div>=</div>
              <span className="font-inter text-xs px-1.5 py-[1px] rounded border border-forest-900 dark:border-forest-500 font-medium">
                Circulating Token Supply
              </span>
              <Icon
                className="text-forest-900 dark:text-forest-500 text-base"
                icon="feather:x"
              />

              <span className="font-inter text-xs px-1.5 py-[1px] rounded border border-forest-900 dark:border-forest-500 font-medium">
                Token Price
              </span>
            </div>,
          ],
          description:
            "The Market Cap is the total value of all circulating tokens, calculated by multiplying the current price of a single token by the total number of tokens in circulation.",

          why: "Market cap is an important metric because it provides a quick snapshot of a token's market dominance, helping investors assess its popularity. It is important though to also consider a tokens issuance rate (Circulating supply / Total supply) to paint a full picture. Note: A token can be related to multiple chains (i.e. MATIC is connected to Polygon zkEVM and Polygon PoS).",
          icon: "transaction-costs",
          showGwei: false,
        },
        icon: "gtp-metrics-marketcap",
        key: "market_cap",
        rootKey: "marketCap",
        urlKey: "market-cap",
        url: "/fundamentals/market-cap",
      },
    ],
  },
  {
    name: "Blockspace",
    label: "Blockspace",
    icon: "gtp-usage",
    options: [
      {
        label: "Chain Overview",
        category: "blockspace-categories",
        page: {
          title: "Chain Overview",
          description: `We measure the gas fees spent and the number of transactions sent to smart contracts. We then map these smart contracts to distinct categories. The chart below breaks down the total blockspace of a chain into these categories. Each category is made up of multiple subcategories, which are listed in the mapping table below the chart.
            Toggling between the "Absolute" and "Share of Chain Usage" options shows either the absolute amount of gas fees/transactions, or the share of the chain's total blockspace.`,
          icon: "blockspace-chain-overview",
        },
        icon: "gtp-chain",
        key: "chain-overview",
        rootKey: "chainOverview",
        urlKey: "chain-overview",
        url: "/blockspace/chain-overview",
        excludeFromSitemap: true,
      },
      {
        label: "Category Comparison",
        category: "blockspace-categories",
        page: {
          title: "Category Comparison",
          description:
            "How are certain blockspace categories used on different chains? Explore the varied applications of blockspace categories across Ethereum Layer-2s.",
        },
        icon: "gtp-compare",
        key: "category-comparison",
        rootKey: "categoryComparison",
        urlKey: "category-comparison",
        url: "/blockspace/category-comparison",
      },
      {
        label: "Contracts",
        category: "contracts",
        page: {
          title: "Contracts",
          description:
            "The number of contracts created in the last 24 hours. Methodology and data is derived from L2Beat.com.",
          icon: "gtp-labeled",
        },
        icon: "gtp-labeled",
        key: "contracts",
        rootKey: "contracts",
        urlKey: "contracts",
        url: "https://labels.growthepie.xyz/",
      },
    ],

    // href: "",
  },
  {
    name: "Data Availability",
    label: "Data Availability",
    key: "metrics",
    icon: "gtp-data-availability",
    options: [
      {
        label: "Blob Count",
        category: "metrics",
        page: {
          title: "Active Addresses",
          description:
            "The number of distinct addresses that interacted with a chain.",
          why: "Active addresses is a widely used metric for estimating the number of users on a blockchain network. Although it is not a perfect metric due to the possibility of a single person owning multiple addresses, it can still provide valuable insights into the overall user base of a chain. It is worth noting, however, that this metric can be influenced by Sybil attacks, where an attacker creates a large number of fake identities to artificially inflate the active address count. Therefore, while daily active addresses can be a useful measure, it should be used in conjunction with other metrics to provide a more comprehensive analysis of a chain's user activity.",
          icon: "gtp-metrics-activeaddresses",
        },
        icon: "gtp-blobs",
        key: "blob_count",
        rootKey: "metricsDailyActiveAddresses",
        urlKey: "blob-count",
        url: "/data-availability/blob-count",
      },
      {
        label: "Data Posted",
        category: "metrics",
        page: {
          title: "Active Addresses",
          description:
            "The number of distinct addresses that interacted with a chain.",
          why: "Active addresses is a widely used metric for estimating the number of users on a blockchain network. Although it is not a perfect metric due to the possibility of a single person owning multiple addresses, it can still provide valuable insights into the overall user base of a chain. It is worth noting, however, that this metric can be influenced by Sybil attacks, where an attacker creates a large number of fake identities to artificially inflate the active address count. Therefore, while daily active addresses can be a useful measure, it should be used in conjunction with other metrics to provide a more comprehensive analysis of a chain's user activity.",
          icon: "gtp-metrics-activeaddresses",
        },
        icon: "gtp-metrics-activeaddresses",
        key: "data_posted",
        rootKey: "metricsDailyActiveAddresses",
        urlKey: "data-posted",
        url: "/data-availability/data-posted",
      },
      {
        label: "Fees Paid",
        category: "metrics",
        page: {
          title: "Transaction Count",
          description:
            "The number of daily transactions. We try to only count transactions that are executed by users/smart contracts - no system transactions.",
          why: "The number of transactions processed on a blockchain is a reliable metric for measuring its usage. However, it should be noted that this metric alone may not provide sufficient insight into the actual value of the transactions being conducted. For instance, while some chains may have a lower transaction count, the value of these transactions may be significantly higher due to their use in decentralized finance (DeFi) applications. On the other hand, certain chains may have a higher transaction count due to their use in gaming or other applications involving lower value transactions.",
          icon: "gtp-metrics-transactioncount",
        },
        icon: "gtp-metrics-transactioncount",
        key: "fees_paid",
        rootKey: "metricsTxCount",
        urlKey: "fees-paid",
        url: "/data-availability/fees-paid",
      },
      {
        label: "Fees Paid Per Mbyte",
        category: "metrics",
        page: {
          title: "Throughput",
          description:
            "A chains throughput measured in gas per second. We only include EVM equivalent Layer 2 gas usage.",
          why: "Throughput is a crucial metric for assessing scalability, reflecting a blockchain's actual compute capacity more accurately than transaction counts, which can vary in complexity (i.e. 21,000 gas for an eth transfer vs 280,000 gas for a simple Uniswap swap). Similarly to how modern storage devices are marketed with specs on read/write speeds rather than the number of files they can process, throughput provides a direct measure of a blockchain's ability to handle compute effectively. Throughput also reveals how close a chain is to its operational limits. This metric is essential for app developers and Layer 2 teams to gauge growth potential, potential cost implications, and performance constraints.",
          icon: "gtp-metrics-throughput",
        },
        icon: "gtp-metrics-throughput",
        key: "fees_per_mbyte",
        rootKey: "throughput",
        urlKey: "fees-paid-per-mbyte",
        url: "/data-availability/fees-paid-per-mbyte",
      },
    ],
  },
  // {
  //   name: "Chains",
  //   label: "Single Chain",
  //   key: "chains",
  //   icon: "link",
  //   options: [
  //     {
  //       label: "Ethereum",
  //       page: {
  //         description:
  //           "Ethereum serves as the base layer (Layer 1 or L1) for various Layer 2 (L2) scaling solutions, which aim to improve transaction throughput and reduce costs. As the foundational layer, Ethereum anchors these L2 networks, ensuring they inherit its robust security and trustlessness.",
  //       },
  //       icon: "ethereum-logo-monochrome",
  //       key: "ethereum",
  //       rootKey: "chainsEthereum",
  //       urlKey: "ethereum",
  //     },
  //     {
  //       label: "Base",
  //       page: {
  //         description:
  //           "Base is an fully EVM compatible optimistic rollup built on the OP Stack. It is incubated inside of Coinbase. Public mainnet launch was on August 9th 2023.",
  //       },
  //       icon: "base-logo-monochrome",
  //       key: "base",
  //       rootKey: "chainsBase",
  //       urlKey: "base",
  //     },
  //     {
  //       label: "OP Mainnet",
  //       page: {
  //         description:
  //           "OP Mainnet (formerly Optimism) uses an optimistic rollup approach, where transactions are assumed to be valid unless proven otherwise, and only invalid transactions are rolled back. OP Mainnet launched in August 2021, making it one of the first rollups. It is fully compatible with the Ethereum Virtual Machine (EVM), making it easy for developers to migrate their applications to the OP Mainnet network.",
  //       },
  //       icon: "optimism-logo-monochrome",
  //       key: "optimism",
  //       rootKey: "chainsOptimism",
  //       urlKey: "optimism",
  //     },
  //     {
  //       label: "Public Goods Network",
  //       page: {
  //         description:
  //           "Public Goods Network is a fully EVM compatible optimistic rollup built on the OP Stack. Public launch was in July 2023.",
  //       },
  //       icon: "public-goods-network-logo-monochrome",
  //       key: "gitcoin_pgn",
  //       rootKey: "chainsOptimism",
  //       urlKey: "public-goods-network",
  //     },
  //     {
  //       label: "Zora",
  //       page: {
  //         description:
  //           "Zora is a fully EVM compatible optimistic rollup built on the OP Stack. Public launch was in June 2023.",
  //       },
  //       icon: "zora-logo-monochrome",
  //       key: "zora",
  //       rootKey: "chainsOptimism",
  //       urlKey: "zora",
  //     },
  //     {
  //       label: "Arbitrum One",
  //       page: {
  //         description:
  //           "Arbitrum One is developed by Offchain Labs and its mainnet launched in September 2021. It uses an optimistic rollup approach and is fully compatible with the Ethereum Virtual Machine (EVM), making it developer-friendly.",
  //       },
  //       icon: "arbitrum-logo-monochrome",
  //       key: "arbitrum",
  //       rootKey: "chainsArbitrum",
  //       urlKey: "arbitrum",
  //     },

  //     {
  //       label: "Polygon zkEVM",
  //       page: {
  //         description:
  //           "Polygon zkEVM uses zero-knowledge proofs to enable faster and cheaper transactions. It allows users to build and run EVM-compatible smart contracts, achieving up to 100x lower gas fees and up to 2,000x faster transaction speeds than the Ethereum mainnet. It's fully compatible with the Ethereum Virtual Machine, making it easy for developers to migrate their applications to the Polygon network. It launched in March 2023.",
  //       },
  //       icon: "polygon-zkevm-logo-monochrome",
  //       key: "polygon_zkevm",
  //       rootKey: "chainsPolygon",
  //       urlKey: "polygon-zkevm",
  //     },

  //     {
  //       label: "ZKsync Era",
  //       page: {
  //         description:
  //           "ZKsync Era is a Layer 2 protocol that scales Ethereum with cutting-edge ZK tech. Their mission isn't to merely increase Ethereum's throughput, but to fully preserve its foundational values – freedom, self-sovereignty, decentralization – at scale.",
  //       },
  //       icon: "zksync-era-logo-monochrome",
  //       key: "zksync_era",
  //       rootKey: "chainsOptimism",
  //       urlKey: "zksync-era",
  //     },
  //     {
  //       label: "Linea",
  //       page: {
  //         description:
  //           "Linea is a developer-friendly ZK Rollup, marked as the next stage of ConsenSys zkEVM, which aims to enhance the Ethereum network by facilitating a new wave of decentralized applications. Public launch was in July 2023.",
  //       },
  //       icon: "linea-logo-monochrome",
  //       key: "linea",
  //       rootKey: "chainsLinea",
  //       urlKey: "linea",
  //     },
  //     {
  //       label: "Scroll",
  //       page: {
  //         description:
  //           "Scroll is a general purpose zkEVM rollup. Public launch was in October 2023.",
  //       },
  //       icon: "scroll-logo-monochrome",
  //       key: "scroll",
  //       rootKey: "chainsScroll",
  //       urlKey: "scroll",
  //     },
  //     {
  //       label: "Loopring",
  //       page: {
  //         description: "",
  //       },
  //       icon: "loopring-logo-monochrome",
  //       key: "loopring",
  //       rootKey: "chainsLoopring",
  //       urlKey: "loopring",
  //     },
  //     {
  //       label: "Starknet",
  //       page: {
  //         description:
  //           "Starknet is a ZK Rollup developed by Starkware. The rollup was launched on mainnet in November 2021.",
  //       },
  //       icon: "starknet-logo-monochrome",
  //       key: "starknet",
  //       rootKey: "chainsStarknet",
  //       urlKey: "starknet",
  //       // hide: true, // remove when unhiding from the UI
  //     },
  //     {
  //       label: "Immutable X",
  //       page: {
  //         description:
  //           "Immutable X is an optimized game-specific ZK Rollup. It is designed to mint, transfer, and trade tokens and NFTs at higher volumes and zero gas fees. It is not EVM compatible but its easy-to-use APIs and SDKs aim to make development for game devs as easy as possible. It launched in April 2021.",
  //       },
  //       icon: "immutable-x-logo-monochrome",
  //       key: "imx",
  //       rootKey: "chainsImmutableX",
  //       urlKey: "immutable-x",
  //     },
  //     {
  //       label: "Mantle",
  //       page: {
  //         description:
  //           "Mantle is an OVM based EVM-compatible rollup. Public launch was in July 2023.",
  //       },
  //       icon: "mantle-logo-monochrome",
  //       key: "mantle",
  //       rootKey: "chainsMantle",
  //       urlKey: "mantle",
  //     },
  //     {
  //       label: "rhino.fi",
  //       page: {
  //         description:
  //           "rhino.fi is a fully EVM compatible optimistic rollup built on the OP Stack. Public launch was in July 2023.",
  //       },
  //       icon: "rhino-logo-monochrome",
  //       key: "rhino",
  //       rootKey: "chainsRhino",
  //       urlKey: "rhino-fi",
  //     },
  //     {
  //       label: "Metis",
  //       page: {
  //         description:
  //           "Metis is a Layer 2 protocol that was launched November 2021.",
  //       },
  //       icon: "metis-logo-monochrome",
  //       key: "metis",
  //       rootKey: "chainsMetis",
  //       urlKey: "metis",
  //     },
  //     {
  //       label: "Manta Pacific",
  //       page: {
  //         description:
  //           "Manta Pacific is a fully EVM compatible optimistic rollup built on the OP Stack. Public launch was in September 2023.",
  //       },
  //       icon: "manta-logo-monochrome",
  //       key: "manta",
  //       rootKey: "chainsManta",
  //       urlKey: "manta",
  //     },
  //     {
  //       label: "Blast",
  //       page: {
  //         description:
  //           "Blast is a fully EVM compatible optimistic rollup built on the OP Stack. Public launch was in February 2024.",
  //       },
  //       icon: "blast-logo-monochrome",
  //       key: "blast",
  //       rootKey: "chainsBlast",
  //       urlKey: "blast",
  //     },
  //     {
  //       label: "Mode",
  //       page: {
  //         description:
  //           "Mode is a fully EVM compatible optimistic rollup built on the OP Stack. Public launch was in February 2024.",
  //       },
  //       icon: "mode-logo-monochrome",
  //       key: "mode",
  //       rootKey: "chainsMode",
  //       urlKey: "mode",
  //     },
  //     {
  //       label: "Taiko",
  //       page: {
  //         description: "Taiko is.",
  //       },
  //       icon: "taiko-logo-monochrome",
  //       key: "taiko",
  //       rootKey: "chainsTaiko",
  //       urlKey: "taiko",
  //     },
  //     {
  //       label: "Redstone",
  //       page: {
  //         description: "Redstone is.",
  //       },
  //       icon: "redstone-logo-monochrome",
  //       key: "redstone",
  //       rootKey: "chainsRedstone",
  //       urlKey: "redstone",
  //     },
  //   ],
  // },

  // {
  //   name: "Knowledge",
  //   label: "Knowledge",
  //   icon: "book-open",
  //   options: [],
  //   href: "https://docs.growthepie.xyz/",
  // },
  {
    name: "Trackers",
    label: "Public Goods",
    icon: "gtp-tracker",
    options: [
      // {
      //   label: "fees.growthepie.xyz",
      //   icon: "gtp-pie",
      //   category: "gtpmetrics",
      //   key: "https://fees.growthepie.xyz",
      //   rootKey: "feesxyz",
      //   urlKey: "feesxyz",
      //   excludeFromSitemap: true,
      // },
      // {
      //   label: "labels.growthepie.xyz",
      //   icon: "gtp-pie",
      //   category: "gtpmetrics",
      //   key: "https://labels.growthepie.xyz",
      //   rootKey: "labelsxyz",
      //   urlKey: "labelsxyz",
      //   excludeFromSitemap: true,
      //   showNew: true,
      // },
      {
        label: "OP RetroPGF 3",
        icon: "optimism-logo-monochrome",
        category: "public-goods-funding",
        key: "rpgf3",
        rootKey: "rpgf3",
        urlKey: "optimism-retropgf-3",
        url: "/trackers/optimism-retropgf-3",
      },
      {
        label: "Octant",
        icon: "octant-monochrome",
        category: "public-goods-funding",
        key: "octant",
        rootKey: "octant",
        urlKey: "octant",
        url: "/trackers/octant",
        showNew: false,
      },
      {
        label: "Glo Dollar",
        icon: "glo-dollar-monochrome",
        category: "public-goods-funding",
        key: "glodollar",
        rootKey: "glodollar",
        urlKey: "glodollar",
        url: "/trackers/glodollar",
      },
    ],
  },

  // // put navigation items that we want to hide in production here
  // ...(IS_PREVIEW
  //   ? [
  // {
  //   name: "Blog",
  //   label: "Blog",
  //   icon: "blog",
  //   options: [],
  //   href: "https://mirror.xyz/blog.growthepie.eth",
  // },

  //   ]
  // : []),
];

export const contributorsItem: NavigationItem = {
  name: "Contributors",
  label: "Contributors",
  icon: "compass",
  options: [],
  href: "/contributors",
};

export const getFundamentalsByKey = (() => {
  const fundamentalsByKey = {};

  // Loop through each item in navigationItems
  for (const item of navigationItems) {
    if (item.key === "metrics" && item.options && item.options.length > 0) {
      // Loop through each option
      for (const option of item.options) {
        if (option.key) {
          fundamentalsByKey[option.key] = option;
        }
      }
    }
  }

  return fundamentalsByKey;
})();

export const apiDocsItem: NavigationItem = {
  name: "API Documentation",
  label: "API Documentation",
  icon: "file-text",
  options: [],
  href: "https://docs.growthepie.xyz/api",
};
