import { Check } from 'lucide-react';

export default function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        'Up to 10 projects',
        '5GB storage',
        'Email support',
        'Community access',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'For growing teams',
      features: [
        'Unlimited projects',
        '100GB storage',
        'Priority email & chat support',
        'Advanced analytics',
        'Team collaboration',
        'Custom integrations',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Unlimited storage',
        '24/7 phone support',
        'Dedicated account manager',
        'Custom SLA',
        'Security audit',
      ],
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg p-8 transition ${
                plan.highlighted
                  ? 'bg-blue-600 text-white shadow-xl scale-105'
                  : 'bg-white shadow-lg'
              }`}
            >
              <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? '' : 'text-gray-800'}`}>
                {plan.name}
              </h3>
              <p className={`mb-4 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={plan.highlighted ? 'text-blue-100' : 'text-gray-600'}>
                  {plan.period}
                </span>
              </div>

              <button
                className={`w-full py-3 rounded-lg font-bold mb-6 transition ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Get Started
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}