import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield, Info } from 'lucide-react';

export default function TrustRow() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start flex-wrap mt-6 sm:mt-8">
      {/* Badge 1: Kostenlos & unverbindlich */}
      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium border border-gray-200">
        <CheckCircle className="w-4 h-4 flex-shrink-0 text-primary" aria-hidden="true" />
        <span>Kostenlos & unverbindlich</span>
      </div>

      {/* Badge 2: Transparente Methodik (clickable) */}
      <Link
        to="/methodik"
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium border border-gray-200 hover:bg-gray-200 hover:border-gray-300 transition-colors"
      >
        <Info className="w-4 h-4 flex-shrink-0 text-primary" aria-hidden="true" />
        <span>Transparente Methodik</span>
      </Link>

      {/* Badge 3: Datenschutz (clickable) */}
      <Link
        to="/datenschutz"
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium border border-gray-200 hover:bg-gray-200 hover:border-gray-300 transition-colors"
      >
        <Shield className="w-4 h-4 flex-shrink-0 text-primary" aria-hidden="true" />
        <span>Datenschutz (DSGVO)</span>
      </Link>
    </div>
  );
}
