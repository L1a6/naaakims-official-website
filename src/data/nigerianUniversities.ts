// Comprehensive list of Nigerian universities with medical/dental faculties
// Grouped by type for better organization

export interface University {
  value: string;
  label: string;
  state: string;
  type: 'federal' | 'state' | 'private';
}

export const nigerianUniversities: University[] = [
  // ─── Federal Universities ────────────────────────────────────
  { value: 'uniuyo', label: 'University of Uyo', state: 'Akwa Ibom', type: 'federal' },
  { value: 'unilag', label: 'University of Lagos', state: 'Lagos', type: 'federal' },
  { value: 'ui', label: 'University of Ibadan', state: 'Oyo', type: 'federal' },
  { value: 'abu', label: 'Ahmadu Bello University, Zaria', state: 'Kaduna', type: 'federal' },
  { value: 'unn', label: 'University of Nigeria, Nsukka', state: 'Enugu', type: 'federal' },
  { value: 'uniben', label: 'University of Benin', state: 'Edo', type: 'federal' },
  { value: 'oau', label: 'Obafemi Awolowo University, Ile-Ife', state: 'Osun', type: 'federal' },
  { value: 'unical', label: 'University of Calabar', state: 'Cross River', type: 'federal' },
  { value: 'unimaid', label: 'University of Maiduguri', state: 'Borno', type: 'federal' },
  { value: 'unilorin', label: 'University of Ilorin', state: 'Kwara', type: 'federal' },
  { value: 'unijos', label: 'University of Jos', state: 'Plateau', type: 'federal' },
  { value: 'uniport', label: 'University of Port Harcourt', state: 'Rivers', type: 'federal' },
  { value: 'unizik', label: 'Nnamdi Azikiwe University, Awka', state: 'Anambra', type: 'federal' },
  { value: 'buk', label: 'Bayero University, Kano', state: 'Kano', type: 'federal' },
  { value: 'uniabuja', label: 'University of Abuja', state: 'FCT', type: 'federal' },
  { value: 'udusok', label: 'Usmanu Danfodiyo University, Sokoto', state: 'Sokoto', type: 'federal' },
  { value: 'fuo', label: 'Federal University, Oye-Ekiti', state: 'Ekiti', type: 'federal' },
  { value: 'fulafia', label: 'Federal University, Lafia', state: 'Nasarawa', type: 'federal' },
  { value: 'fudutsinma', label: 'Federal University, Dutsin-Ma', state: 'Katsina', type: 'federal' },
  { value: 'fuotuoke', label: 'Federal University, Otuoke', state: 'Bayelsa', type: 'federal' },
  { value: 'fuwukari', label: 'Federal University, Wukari', state: 'Taraba', type: 'federal' },
  { value: 'fugashua', label: 'Federal University, Gashua', state: 'Yobe', type: 'federal' },
  { value: 'fubk', label: 'Federal University, Birnin Kebbi', state: 'Kebbi', type: 'federal' },
  { value: 'fugusau', label: 'Federal University, Gusau', state: 'Zamfara', type: 'federal' },
  { value: 'fulokoja', label: 'Federal University, Lokoja', state: 'Kogi', type: 'federal' },
  { value: 'funai', label: 'Alex Ekwueme Federal University, Ndufu-Alike', state: 'Ebonyi', type: 'federal' },
  { value: 'futminna', label: 'Federal University of Technology, Minna', state: 'Niger', type: 'federal' },
  { value: 'futa', label: 'Federal University of Technology, Akure', state: 'Ondo', type: 'federal' },
  { value: 'atbu', label: 'Abubakar Tafawa Balewa University, Bauchi', state: 'Bauchi', type: 'federal' },
  { value: 'moddibo', label: 'Modibbo Adama University, Yola', state: 'Adamawa', type: 'federal' },
  { value: 'ndu', label: 'National Defence University, Abuja', state: 'FCT', type: 'federal' },
  { value: 'fuhso', label: 'Federal University of Health Sciences, Otukpo', state: 'Benue', type: 'federal' },
  { value: 'fuhsia', label: 'Federal University of Health Sciences, Ila Orangun', state: 'Osun', type: 'federal' },
  { value: 'fuhsaz', label: 'Federal University of Health Sciences, Azare', state: 'Bauchi', type: 'federal' },

  // ─── State Universities ──────────────────────────────────────
  { value: 'lasu', label: 'Lagos State University', state: 'Lagos', type: 'state' },
  { value: 'abuad', label: 'Abia State University, Uturu', state: 'Abia', type: 'state' },
  { value: 'lautech', label: 'Ladoke Akintola University of Technology, Ogbomoso', state: 'Oyo', type: 'state' },
  { value: 'ambrose', label: 'Ambrose Alli University, Ekpoma', state: 'Edo', type: 'state' },
  { value: 'delsu', label: 'Delta State University, Abraka', state: 'Delta', type: 'state' },
  { value: 'busari', label: 'Benue State University, Makurdi', state: 'Benue', type: 'state' },
  { value: 'eksu', label: 'Ekiti State University, Ado-Ekiti', state: 'Ekiti', type: 'state' },
  { value: 'ebsu', label: 'Ebonyi State University, Abakaliki', state: 'Ebonyi', type: 'state' },
  { value: 'imsu', label: 'Imo State University, Owerri', state: 'Imo', type: 'state' },
  { value: 'oou', label: 'Olabisi Onabanjo University, Ago-Iwoye', state: 'Ogun', type: 'state' },
  { value: 'osustech', label: 'Ondo State University of Science and Technology', state: 'Ondo', type: 'state' },
  { value: 'uniosun', label: 'Osun State University, Osogbo', state: 'Osun', type: 'state' },
  { value: 'plasmau', label: 'Plateau State University, Bokkos', state: 'Plateau', type: 'state' },
  { value: 'rsu', label: 'Rivers State University, Port Harcourt', state: 'Rivers', type: 'state' },
  { value: 'gomsu', label: 'Gombe State University', state: 'Gombe', type: 'state' },
  { value: 'kasu', label: 'Kaduna State University', state: 'Kaduna', type: 'state' },
  { value: 'kwasu', label: 'Kwara State University, Malete', state: 'Kwara', type: 'state' },
  { value: 'nsu', label: 'Niger State University (IBB University, Lapai)', state: 'Niger', type: 'state' },
  { value: 'coou', label: 'Chukwuemeka Odumegwu Ojukwu University, Uli', state: 'Anambra', type: 'state' },
  { value: 'umyu', label: 'Umaru Musa Yar\'Adua University, Katsina', state: 'Katsina', type: 'state' },
  { value: 'ksust', label: 'Kebbi State University of Science and Technology', state: 'Kebbi', type: 'state' },
  { value: 'tsuk', label: 'Taraba State University, Jalingo', state: 'Taraba', type: 'state' },
  { value: 'ysu', label: 'Yobe State University, Damaturu', state: 'Yobe', type: 'state' },
  { value: 'aku', label: 'Akwa Ibom State University, Ikot Akpaden', state: 'Akwa Ibom', type: 'state' },
  { value: 'bsu', label: 'Bayelsa Medical University', state: 'Bayelsa', type: 'state' },
  { value: 'gouu', label: 'Godfrey Okoye University', state: 'Enugu', type: 'state' },
  { value: 'ensu', label: 'Enugu State University of Science and Technology', state: 'Enugu', type: 'state' },
  { value: 'ndsu', label: 'Niger Delta University, Wilberforce Island', state: 'Bayelsa', type: 'state' },
  { value: 'ksms', label: 'Kano State University of Science and Technology, Wudil', state: 'Kano', type: 'state' },
  { value: 'nsuk', label: 'Nasarawa State University, Keffi', state: 'Nasarawa', type: 'state' },
  { value: 'oysm', label: 'Oyo State College of Medicine (LAUTECH)', state: 'Oyo', type: 'state' },

  // ─── Private Universities ────────────────────────────────────
  { value: 'babcock', label: 'Babcock University, Ilishan-Remo', state: 'Ogun', type: 'private' },
  { value: 'bingham', label: 'Bingham University, Jos', state: 'Plateau', type: 'private' },
  { value: 'bowen', label: 'Bowen University, Iwo', state: 'Osun', type: 'private' },
  { value: 'madonna', label: 'Madonna University, Elele', state: 'Rivers', type: 'private' },
  { value: 'igbinedion', label: 'Igbinedion University, Okada', state: 'Edo', type: 'private' },
  { value: 'afe', label: 'Afe Babalola University, Ado-Ekiti', state: 'Ekiti', type: 'private' },
  { value: 'nileuni', label: 'Nile University of Nigeria, Abuja', state: 'FCT', type: 'private' },
  { value: 'covenant', label: 'Covenant University, Ota', state: 'Ogun', type: 'private' },
  { value: 'redeemers', label: 'Redeemer\'s University, Ede', state: 'Osun', type: 'private' },
  { value: 'achievers', label: 'Achievers University, Owo', state: 'Ondo', type: 'private' },
  { value: 'gregory', label: 'Gregory University, Uturu', state: 'Abia', type: 'private' },
  { value: 'hallmark', label: 'Hallmark University, Ijebu-Itele', state: 'Ogun', type: 'private' },
  { value: 'aum', label: 'American University of Nigeria, Yola', state: 'Adamawa', type: 'private' },
  { value: 'lmu', label: 'Landmark University, Omu-Aran', state: 'Kwara', type: 'private' },
  { value: 'cu', label: 'Crawford University, Igbesa', state: 'Ogun', type: 'private' },
  { value: 'whu', label: 'Westland University, Iwo', state: 'Osun', type: 'private' },
  { value: 'philomath', label: 'Philomath University, Kuje', state: 'FCT', type: 'private' },
  { value: 'omu', label: 'Obong University, Obong Ntak', state: 'Akwa Ibom', type: 'private' },
  { value: 'ritman', label: 'Ritman University, Ikot Ekpene', state: 'Akwa Ibom', type: 'private' },
  { value: 'caleb', label: 'Caleb University, Imota', state: 'Lagos', type: 'private' },
  { value: 'lead', label: 'Lead City University, Ibadan', state: 'Oyo', type: 'private' },
  { value: 'novena', label: 'Novena University, Ogume', state: 'Delta', type: 'private' },
  { value: 'wellspring', label: 'Wellspring University, Benin City', state: 'Edo', type: 'private' },
  { value: 'ajayi', label: 'Ajayi Crowther University, Oyo', state: 'Oyo', type: 'private' },
  { value: 'elizade', label: 'Elizade University, Ilara-Mokin', state: 'Ondo', type: 'private' },
  { value: 'evanuni', label: 'Evangel University, Akaeze', state: 'Ebonyi', type: 'private' },
];

// Sorted alphabetically by label for easy selection
export const sortedUniversities = [...nigerianUniversities].sort((a, b) =>
  a.label.localeCompare(b.label)
);

// Grouped by state
export const universitiesByState = nigerianUniversities.reduce<Record<string, University[]>>(
  (acc, uni) => {
    if (!acc[uni.state]) acc[uni.state] = [];
    acc[uni.state].push(uni);
    return acc;
  },
  {}
);

// Grouped by type
export const universitiesByType = {
  federal: nigerianUniversities.filter(u => u.type === 'federal'),
  state: nigerianUniversities.filter(u => u.type === 'state'),
  private: nigerianUniversities.filter(u => u.type === 'private'),
};
