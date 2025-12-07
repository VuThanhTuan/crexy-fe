'use client';

import { Facebook, Linkedin, Youtube, Instagram, MapPin, Phone, Mail, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export const Footer: React.FC = () => {
    const [expandedSections, setExpandedSections] = useState<{
        company: boolean;
        categories: boolean;
        collections: boolean;
        informations: boolean;
    }>({
        company: false,
        categories: false,
        collections: false,
        informations: false,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <footer className="w-full max-w-full py-8 md:py-12 overflow-x-hidden">
            <div className="container mx-auto px-4">
                {/* Mobile & Tablet: Stack vertically, Desktop: Side by side */}
                <div className="flex flex-col lg:flex-row gap-0 lg:gap-0 max-w-full">
                    {/* Column 1: Creaxy Brand Information */}
                    <div className="w-full lg:w-[50%] border-crexy-primary/20">
                        <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-crexy-primary uppercase py-4">
                            Creaxy
                        </h2>

                        {/* Content - Always visible */}
                        <div>
                            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-4 h-4 text-crexy-primary mt-0.5 flex-shrink-0 uppercase" />
                                    <span className="text-crexy-primary text-sm">
                                        336 Đường 2/9 P. Hòa Cường TP. Đà Nẵng
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-4 h-4 text-crexy-primary flex-shrink-0" />
                                    <span className="text-crexy-primary text-sm uppercase">0963013748</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-4 h-4 text-crexy-primary flex-shrink-0" />
                                    <span className="text-crexy-primary text-sm break-all">creaxy-support@gmail.com</span>
                                </div>
                            </div>

                            <div className="flex space-x-4 pb-4 lg:pb-0">
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

                    {/* Columns 2-4: Navigation Links */}
                    <div className='w-full lg:w-[50%] flex flex-col lg:grid lg:grid-cols-3 lg:gap-4'>
                        {/* Column 2: Categories */}
                        <div className="border-crexy-primary/20">
                            <button 
                                onClick={() => toggleSection('categories')}
                                className="w-full flex items-center justify-between py-4 lg:pointer-events-none"
                            >
                                <h3 className="text-base md:text-lg font-bold text-crexy-primary uppercase">Categories</h3>
                                {expandedSections.categories ? (
                                    <Minus className="w-5 h-5 text-crexy-primary lg:hidden" />
                                ) : (
                                    <Plus className="w-5 h-5 text-crexy-primary lg:hidden" />
                                )}
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 lg:!block ${
                                expandedSections.categories ? 'max-h-96 pb-4' : 'max-h-0 lg:max-h-none'
                            }`}>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity uppercase">
                                            Underware
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity uppercase">
                                            Swimsuits
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity uppercase">
                                            Sleepwear
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Column 3: Collections */}
                        <div className="border-crexy-primary/20">
                            <button 
                                onClick={() => toggleSection('collections')}
                                className="w-full flex items-center justify-between py-4 lg:pointer-events-none"
                            >
                                <h3 className="text-base md:text-lg font-bold text-crexy-primary uppercase">Collections</h3>
                                {expandedSections.collections ? (
                                    <Minus className="w-5 h-5 text-crexy-primary lg:hidden" />
                                ) : (
                                    <Plus className="w-5 h-5 text-crexy-primary lg:hidden" />
                                )}
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 lg:!block ${
                                expandedSections.collections ? 'max-h-96 pb-4' : 'max-h-0 lg:max-h-none'
                            }`}>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity uppercase">
                                            The first collection
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity uppercase">
                                            The summer collection
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity uppercase">
                                            The lux collection
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Column 4: Informations */}
                        <div className="border-crexy-primary/20">
                            <button 
                                onClick={() => toggleSection('informations')}
                                className="w-full flex items-center justify-between py-4 lg:pointer-events-none"
                            >
                                <h3 className="text-base md:text-lg font-bold text-crexy-primary uppercase">Informations</h3>
                                {expandedSections.informations ? (
                                    <Minus className="w-5 h-5 text-crexy-primary lg:hidden" />
                                ) : (
                                    <Plus className="w-5 h-5 text-crexy-primary lg:hidden" />
                                )}
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 lg:!block ${
                                expandedSections.informations ? 'max-h-96 pb-4' : 'max-h-0 lg:max-h-none'
                            }`}>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity uppercase">
                                            Contact us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity uppercase">
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity uppercase">
                                            FAQ
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity uppercase">
                                            Shipping & Delivery
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-crexy-primary text-sm hover:opacity-80 transition-opacity uppercase">
                                            Returns & Exchanges
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};