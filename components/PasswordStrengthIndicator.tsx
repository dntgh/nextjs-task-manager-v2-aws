import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface PasswordRequirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

interface PasswordStrengthIndicatorProps {
  password: string;
  onValidityChange?: (isValid: boolean) => void;
}

const requirements: PasswordRequirement[] = [
  { id: 'length', label: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
  { id: 'uppercase', label: 'At least one uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
  { id: 'lowercase', label: 'At least one lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
  { id: 'number', label: 'At least one number', test: (pwd) => /[0-9]/.test(pwd) },
  { id: 'special', label: 'At least one special character', test: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd) }
];

export function PasswordStrengthIndicator({ password, onValidityChange }: PasswordStrengthIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [metRequirements, setMetRequirements] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Show indicator once user starts typing
    if (password.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Check each requirement
    const met = new Set<string>();
    let allMet = true;

    requirements.forEach((req) => {
      if (req.test(password)) {
        met.add(req.id);
      } else {
        allMet = false;
      }
    });

    setMetRequirements(met);

    // Notify parent of validity change
    if (onValidityChange) {
      onValidityChange(allMet && password.length > 0);
    }
  }, [password, onValidityChange]);

  if (!isVisible) {
    return null;
  }

  const allRequirementsMet = metRequirements.size === requirements.length;

  return (
    <div className="space-y-2 mt-2">
      <ul className="space-y-1.5">
        {requirements.map((req) => {
          const isMet = metRequirements.has(req.id);
          return (
            <li 
              key={req.id} 
              className="flex items-center gap-2 text-sm transition-colors duration-200"
            >
              {isMet ? (
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              )}
              <span className={isMet ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
                {req.label}
              </span>
            </li>
          );
        })}
      </ul>
      {allRequirementsMet && (
        <p className="text-sm text-green-600 dark:text-green-400 font-medium">
          Password is secure
        </p>
      )}
    </div>
  );
}
