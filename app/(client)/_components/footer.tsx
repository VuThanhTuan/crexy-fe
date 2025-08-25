import { Facebook, Linkedin, Youtube, Instagram, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-linear-to-t from-violet-300 to-pink-200 py-12">
            <div className="container mx-auto px-4 flex flex-row">
                <div className="w-[50%]">
                    {/* Column 1: Creaxy Brand Information */}
                    <div className="md:col-span-1">
                        <h2 className="text-4xl font-bold text-crexy-primary mb-6">Creaxy</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-4 h-4 text-crexy-primary" />
                                <span className="text-crexy-primary text-sm">
                                    336 Đường 2/9 P. Hòa Cường TP. Đà Nẵng
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-crexy-primary" />
                                <span className="text-crexy-primary text-sm">0963013748</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-crexy-primary" />
                                <span className="text-crexy-primary text-sm">creaxy-support@gmail.com</span>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <a href="#" className="text-crexy-primary hover:opacity-80 transition-opacity">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-crexy-primary hover:opacity-80 transition-opacity">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-crexy-primary hover:opacity-80 transition-opacity">
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-crexy-primary hover:opacity-80 transition-opacity">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                </div>
                <div className='w-[50%] flex flex-row'>

                    {/* Column 2: Categories */}
                    <div className='basis-1/3'>
                        <h3 className="text-lg font-bold text-crexy-primary mb-4">Categories</h3>
                        <div className="text-crexy-primary text-sm">
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity">
                                        Underware
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity">
                                        Swimsuits
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity">
                                        Sleepwear
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>

                    {/* Column 3: Collections */}
                    <div className='basis-1/3'>
                        <h3 className="text-lg font-bold text-crexy-primary mb-4">Collections</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity">
                                    The first collection
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity">
                                    The summer collection
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity">
                                    The lux collection
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Informations */}
                    <div className='basis-1/3'>
                        <h3 className="text-lg font-bold text-crexy-primary mb-4">Informations</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity">
                                    Contact us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity">
                                    Shipping & Delivery
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity">
                                    Returns & Exchanges
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};