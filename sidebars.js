/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    {
      type: 'doc',
      id: 'introduction',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'product-feature',
      label: 'Product Features',
    },
    {
      type: 'doc',
      id: 'authentication',
      label: 'Authentication',
    },
    {
      type: 'category',
      label: 'Bulk Sending',
      link: { type: 'doc', id: 'bulk-sending/index' },
      items: [
        'bulk-sending/integration-interfaces',
        'bulk-sending/process-flows',
        'bulk-sending/api-reference',
        'bulk-sending/exceptions',
        'bulk-sending/backoffice',
        'bulk-sending/response-codes',
        'bulk-sending/purpose-codes',
      ],
    },
    {
      type: 'category',
      label: 'P2P',
      link: { type: 'doc', id: 'p2p/index' },
      items: [
        'p2p/customer-registration',
        'p2p/alias-management',
        'p2p/account-management',
        'p2p/payment-apis',
        'p2p/inquiry-apis',
        'p2p/limits-api',
        'p2p/host-message-spec',
        'p2p/frms-api',
        'p2p/response-codes',
      ],
    },
    {
      type: 'category',
      label: 'P2M – Merchant',
      link: { type: 'doc', id: 'p2m/index' },
      items: [
        'p2m/customer-initiated',
        'p2m/merchant-initiated',
        'p2m/onus-payments',
        'p2m/channel-apis',
        'p2m/response-codes',
      ],
    },
    {
      type: 'category',
      label: 'PISP',
      link: { type: 'doc', id: 'pisp/index' },
      items: [
        'pisp/oc-initiated',
        'pisp/channel-integration',
      ],
    },
    {
      type: 'category',
      label: 'Remittance',
      link: { type: 'doc', id: 'remittance/index' },
      items: [
        'remittance/inquiry-apis',
        'remittance/payment-apis',
        'remittance/host-message-spec',
        'remittance/response-codes',
      ],
    },
  ],
};

export default sidebars;
