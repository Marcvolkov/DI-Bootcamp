// Exercise 6: Intersection Types and Type Guards
// Combine Person and Job types, then use type guards to differentiate between Employee types

console.log("=== Exercise 6: Intersection Types and Type Guards ===");

// Define base types
type Person = {
    name: string;
    age: number;
    email: string;
};

type Job = {
    title: string;
    department: string;
    salary: number;
    startDate: Date;
};

// Create intersection type
type Employee = Person & Job;

// Additional employee types for demonstration
type Manager = Employee & {
    teamSize: number;
    budget: number;
};

type Developer = Employee & {
    programmingLanguages: string[];
    yearsExperience: number;
};

type Designer = Employee & {
    designTools: string[];
    portfolio: string;
};

// Union type for all employee types
type AnyEmployee = Employee | Manager | Developer | Designer;

// Type guard functions
function isManager(employee: AnyEmployee): employee is Manager {
    return 'teamSize' in employee && 'budget' in employee;
}

function isDeveloper(employee: AnyEmployee): employee is Developer {
    return 'programmingLanguages' in employee && 'yearsExperience' in employee;
}

function isDesigner(employee: AnyEmployee): employee is Designer {
    return 'designTools' in employee && 'portfolio' in employee;
}

function isBasicEmployee(employee: AnyEmployee): employee is Employee {
    return !isManager(employee) && !isDeveloper(employee) && !isDesigner(employee);
}

// Function to process different employee types using type guards
function processEmployee(employee: AnyEmployee): string {
    // Base employee information
    let info = `${employee.name} (${employee.age} years old)\n`;
    info += `Email: ${employee.email}\n`;
    info += `Position: ${employee.title} in ${employee.department}\n`;
    info += `Salary: $${employee.salary.toLocaleString()}\n`;
    info += `Start Date: ${employee.startDate.toDateString()}\n`;
    
    // Additional information based on employee type
    if (isManager(employee)) {
        info += `Team Size: ${employee.teamSize} people\n`;
        info += `Budget: $${employee.budget.toLocaleString()}\n`;
        info += "Role: Management";
    } else if (isDeveloper(employee)) {
        info += `Programming Languages: ${employee.programmingLanguages.join(', ')}\n`;
        info += `Experience: ${employee.yearsExperience} years\n`;
        info += "Role: Development";
    } else if (isDesigner(employee)) {
        info += `Design Tools: ${employee.designTools.join(', ')}\n`;
        info += `Portfolio: ${employee.portfolio}\n`;
        info += "Role: Design";
    } else {
        info += "Role: General Employee";
    }
    
    return info;
}

// Create sample employees
console.log("Creating sample employees:");

const basicEmployee: Employee = {
    name: "John Smith",
    age: 28,
    email: "john.smith@company.com",
    title: "Administrative Assistant",
    department: "Administration",
    salary: 45000,
    startDate: new Date('2023-01-15')
};

const manager: Manager = {
    name: "Sarah Johnson",
    age: 35,
    email: "sarah.johnson@company.com",
    title: "Engineering Manager",
    department: "Engineering",
    salary: 120000,
    startDate: new Date('2020-03-10'),
    teamSize: 8,
    budget: 2000000
};

const developer: Developer = {
    name: "Mike Chen",
    age: 29,
    email: "mike.chen@company.com",
    title: "Senior Software Engineer",
    department: "Engineering",
    salary: 95000,
    startDate: new Date('2021-06-01'),
    programmingLanguages: ["TypeScript", "Python", "Go", "React"],
    yearsExperience: 5
};

const designer: Designer = {
    name: "Emma Davis",
    age: 26,
    email: "emma.davis@company.com",
    title: "UX Designer",
    department: "Design",
    salary: 75000,
    startDate: new Date('2022-09-15'),
    designTools: ["Figma", "Adobe XD", "Sketch", "Photoshop"],
    portfolio: "https://emmadavis.design"
};

// Process each employee using type guards
const employees: AnyEmployee[] = [basicEmployee, manager, developer, designer];

employees.forEach((employee, index) => {
    console.log(`\n--- Employee ${index + 1} ---`);
    console.log(processEmployee(employee));
});

// Function to calculate bonuses based on employee type
function calculateBonus(employee: AnyEmployee): number {
    const baseSalary = employee.salary;
    
    if (isManager(employee)) {
        // Managers get 15% bonus + team performance bonus
        const teamBonus = employee.teamSize * 1000;
        return baseSalary * 0.15 + teamBonus;
    } else if (isDeveloper(employee)) {
        // Developers get bonus based on experience and languages
        const experienceBonus = employee.yearsExperience * 2000;
        const languageBonus = employee.programmingLanguages.length * 1000;
        return experienceBonus + languageBonus;
    } else if (isDesigner(employee)) {
        // Designers get 10% bonus + tool proficiency bonus
        const toolBonus = employee.designTools.length * 800;
        return baseSalary * 0.10 + toolBonus;
    } else {
        // Basic employees get 5% bonus
        return baseSalary * 0.05;
    }
}

console.log("\n=== Bonus Calculations ===");
employees.forEach(employee => {
    const bonus = calculateBonus(employee);
    console.log(`${employee.name}: $${bonus.toLocaleString()} bonus`);
});

// Function to get department statistics using type guards
function getDepartmentStats(employees: AnyEmployee[]): Record<string, {
    count: number;
    totalSalary: number;
    averageSalary: number;
    employeeTypes: string[];
}> {
    const stats: Record<string, any> = {};
    
    employees.forEach(employee => {
        const dept = employee.department;
        
        if (!stats[dept]) {
            stats[dept] = {
                count: 0,
                totalSalary: 0,
                employeeTypes: []
            };
        }
        
        stats[dept].count++;
        stats[dept].totalSalary += employee.salary;
        
        // Determine employee type using type guards
        let employeeType = "Basic Employee";
        if (isManager(employee)) employeeType = "Manager";
        else if (isDeveloper(employee)) employeeType = "Developer";
        else if (isDesigner(employee)) employeeType = "Designer";
        
        if (!stats[dept].employeeTypes.includes(employeeType)) {
            stats[dept].employeeTypes.push(employeeType);
        }
    });
    
    // Calculate averages
    Object.values(stats).forEach((stat: any) => {
        stat.averageSalary = stat.totalSalary / stat.count;
    });
    
    return stats;
}

console.log("\n=== Department Statistics ===");
const departmentStats = getDepartmentStats(employees);
Object.entries(departmentStats).forEach(([dept, stats]) => {
    console.log(`\n${dept} Department:`);
    console.log(`  Employees: ${stats.count}`);
    console.log(`  Total Salary: $${stats.totalSalary.toLocaleString()}`);
    console.log(`  Average Salary: $${Math.round(stats.averageSalary).toLocaleString()}`);
    console.log(`  Employee Types: ${stats.employeeTypes.join(', ')}`);
});

// Advanced: Function to promote employees
function promoteEmployee(employee: AnyEmployee): AnyEmployee {
    if (isDeveloper(employee) && employee.yearsExperience >= 5) {
        // Promote developer to manager
        const newManager: Manager = {
            ...employee,
            title: "Engineering Manager",
            salary: employee.salary * 1.3,
            teamSize: 5,
            budget: 1000000
        };
        console.log(`Promoted ${employee.name} from Developer to Manager`);
        return newManager;
    }
    
    if (isDesigner(employee) && employee.designTools.length >= 4) {
        // Promote designer to senior designer (still designer type but with better salary)
        const seniorDesigner: Designer = {
            ...employee,
            title: "Senior UX Designer",
            salary: employee.salary * 1.2
        };
        console.log(`Promoted ${employee.name} to Senior Designer`);
        return seniorDesigner;
    }
    
    if (isBasicEmployee(employee)) {
        // Promote basic employee to specialist
        const specialist: Employee = {
            ...employee,
            title: `Senior ${employee.title}`,
            salary: employee.salary * 1.15
        };
        console.log(`Promoted ${employee.name} to Senior position`);
        return specialist;
    }
    
    // Handle any remaining cases (managers or developers/designers who don't meet criteria)
    const emp = employee as Employee; // Safe cast since all types extend Employee
    console.log(`${emp.name} is not eligible for promotion at this time`);
    return employee;
}

console.log("\n=== Promotion Results ===");
const promotedEmployees = employees.map(promoteEmployee);

console.log("\n=== After Promotions ===");
promotedEmployees.forEach((employee, index) => {
    console.log(`${employee.name}: ${employee.title} - $${employee.salary.toLocaleString()}`);
});