import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Brain, BarChart as ChartBar } from 'lucide-react';

const features = [
  {
    icon: <TrendingUp className="h-6 w-6 text-white" />,
    title: 'Real-Time Indian Market Insights',
    description: 'Get instant updates on NIFTY, SENSEX, and personalized insights powered by AI.'
  },
  {
    icon: <Shield className="h-6 w-6 text-white" />,
    title: 'Smart Portfolio Management',
    description: 'Receive tailored investment suggestions for Indian markets based on your goals.'
  },
  {
    icon: <Brain className="h-6 w-6 text-white" />,
    title: 'Learn & Grow',
    description: 'Access educational resources about Indian markets and improve your financial literacy.'
  },
  {
    icon: <ChartBar className="h-6 w-6 text-white" />,
    title: 'Market Analysis',
    description: 'Stay ahead with AI-powered analysis of Indian stock market trends and predictions.'
  }
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Your AI-Powered</span>
                  <span className="block text-indigo-600">Investment Partner for Indian Markets!</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Make smarter investment decisions in Indian markets with AI-driven insights, personalized recommendations, and real-time analysis of NIFTY and SENSEX.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/sign-up" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/portfolio/learn" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="Analytics Dashboard"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powerful Features for Smart Investing
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Everything you need to make informed investment decisions and grow your wealth.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        {feature.icon}
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
              Meet Our Team
              </h2>
              <p className="mt-4 text-lg text-gray-500">
              The brilliant minds behind WealthWise's AI-powered financial solutions.
              </p>
            </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Rachit Chheda',
                role: 'Full Stack Developer',
                image: 'https://rachit-chheda.netlify.app/static/media/HeroImage.ff8c45127080e96bd251.jpg',  // Add your image to public/team folder
                description: 'Specializes in AI/ML and financial algorithms. Led the development of our core investment analysis engine.',
                highlight: 'Web Dev Expert',
                github: 'https://github.com/rachitgupta',
                linkedin: 'https://linkedin.com/in/rachitgupta'
              },
              {
                name: 'Mohit Nippanikar',
                role: 'Full Stack Developer',
                image: 'https://media.licdn.com/dms/image/v2/D4D03AQG66DosJBznsg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729079824237?e=1743033600&v=beta&t=wWWlB1pGo9Vcw9n30RbsocpZfubu1oHtPGURV6V3cVE',  // Add your image to public/team folder
                description: 'UI/UX specialist with expertise in creating intuitive and responsive financial dashboards.',
                highlight: 'UI/UX Specialist',
                github: 'https://github.com/johnsmith',
                linkedin: 'https://linkedin.com/in/johnsmith'
              },
              {
                name: 'Meet Patel',
                role: 'AI/ML Developer',
                image: 'https://media.licdn.com/dms/image/v2/D5603AQF3PUbfQY3j3A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1709204577716?e=1743033600&v=beta&t=7hCvxbS2_dtipC9F2xtwJpBhWLw5xvrx7MVUxE0YX9w',  // Add your image to public/team folder
                description: 'Security and scalability expert. Architected our robust financial data processing pipeline.',
                highlight: 'AI/ML Expert',
                github: 'https://github.com/emmawilson',
                linkedin: 'https://linkedin.com/in/emmawilson'
              }
            ].map((member) => (
              <div key={member.name} className="bg-white overflow-hidden shadow-lg rounded-lg flex flex-col">
                {/* Image Container with fixed aspect ratio and highlight effect */}
                <div className="relative pt-[100%]">
                  <div className="absolute inset-0 p-2">
                    <div className="relative h-full w-full overflow-hidden rounded-lg group">
                      <img
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        src={member.image}
                        alt={member.name}
                      />
                      {/* Highlight overlay */}
                      <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-indigo-600 font-medium">{member.role}</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {member.highlight}
                    </span>
                  </div>
                  <p className="text-base text-gray-500 flex-1">
                    {member.description}
                  </p>
                  
                  {/* Social Links - Fixed at bottom */}
                  <div className="mt-6 pt-4 border-t border-gray-200 flex justify-center space-x-6">
                    <a 
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                      <span className="sr-only">GitHub</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;