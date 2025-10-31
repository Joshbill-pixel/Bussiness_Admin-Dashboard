import { useState, useEffect } from 'react';
import { Camera, Edit2, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export default function EditProfile() {
  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(0); // animated percent

  // Animate progress on mount
  useEffect(() => {
    const target = 60; // final percent
    const duration = 900; // ms total animation time
    const fps = 60; // frames per second
    const totalFrames = Math.round((duration / 1000) * fps);
    let frame = 0;

    const raf = () => {
      frame++;
      const eased = easeOutCubic(frame / totalFrames);
      const current = Math.min(target, Math.round(eased * target));
      setProgress(current);
      if (frame < totalFrames) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {}; // no cleanup necessary for RAF here
  }, []);

  // easing function
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  const profileData = {
    fullName: "Uncle Tee's",
    email: 'UncleTees@gmail.com',
    phone: '2348134729',
    location: '',
    bio:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis.',
    photoUrl:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
  };

  const completionItems = [
    { label: 'Set up account', progress: 5, color: 'text-gray-400' },
    { label: 'Upload photo', progress: 100, color: 'text-emerald-600' },
    { label: 'Personal Info', progress: 40, color: 'text-orange-500' },
    { label: 'Location', progress: 30, color: 'text-emerald-600' },
    { label: 'Biography', progress: 70, color: 'text-orange-500' },
    { label: 'Notifications', progress: 50, color: 'text-emerald-600' },
  ];

  // We'll define the circle in a 130x130 viewBox to keep nice padding for strokes.
  const viewBoxSize = 130;
  const center = viewBoxSize / 2; // 65
  const strokeWidth = 12;
  // radius must leave room for stroke: (viewBoxSize/2 - strokeWidth/2)
  const radius = center - strokeWidth / 2; // 65 - 6 = 59
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Edit Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Photo */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6 text-center sm:text-left">
              <div className="relative mb-4 sm:mb-0">
                <img
                  src={profileData.photoUrl}
                  alt="Profile"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover mx-auto sm:mx-0"
                />
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50">
                  <Camera size={18} className="text-gray-600" />
                </button>
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Upload New Photo</h3>
                <p className="text-sm text-gray-500">
                  Recommended: <span className="font-medium">800x800px</span>
                  <br />
                  JPG or PNG formats allowed.
                </p>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Personal Info</h3>
              <button className="text-emerald-600 text-sm font-medium flex items-center space-x-1 hover:text-emerald-700">
                <Edit2 size={14} />
                <span>Edit</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                <p className="text-gray-800 font-medium">{profileData.fullName}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Email</label>
                <p className="text-gray-800 font-medium">{profileData.email}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Phone</label>
                <p className="text-gray-800 font-medium">{profileData.phone}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Location</h3>
              <button className="text-gray-500 text-xs sm:text-sm">Cancel</button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder='Enter Your Location'
                  // value={profileData.location}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button className="bg-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-emerald-600 font-medium transition">
                Save Changes
              </button>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Bio</h3>
              <button className="text-emerald-600 text-sm font-medium flex items-center space-x-1 hover:text-emerald-700">
                <Edit2 size={14} />
                <span>Edit</span>
              </button>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{profileData.bio}</p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm sticky top-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-6">Complete Your Profile</h3>

            {/* Responsive & Animated Donut SVG */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                <svg
                  viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                  className="w-full h-full transform -rotate-90"
                  aria-hidden="true"
                >
                  {/* background ring */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth={strokeWidth}
                    fill="none"
                  />
                  {/* animated progress ring */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="#10b981"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference.toFixed(2)}
                    strokeDashoffset={dashOffset.toFixed(2)}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 800ms ease-out' }}
                  />
                </svg>

                {/* center label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-xl sm:text-3xl font-bold text-gray-800">{progress}%</span>
                </div>
              </div>
            </div>

            {/* Completion Items */}
            <div className="space-y-3 sm:space-y-4">
              {completionItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.color}`}>{item.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5">
        <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>

        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded ${
                currentPage === page ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button className="flex items-center space-x-2 px-4 py-2 text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition">
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      </div>
      </div>
    </div>
  );
}