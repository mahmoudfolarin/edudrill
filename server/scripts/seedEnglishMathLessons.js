require("dotenv").config({ path: require("node:path").join(__dirname, "..", ".env") })

const pool = require("../src/config/database")

const mathUnits = {
  "Number Bases": {
    idea: "A numeral in base b uses place values that are powers of b. The value of digits d_n...d_0 is the sum of each digit multiplied by its place value.",
    method: "For conversion from base ten, divide repeatedly by the target base and read remainders upward. For conversion to base ten, expand by place values. For arithmetic in another base, use the same column methods as decimal but regroup at the base, not at ten.",
    example: "For example, 1011_2 = 1(2^3) + 0(2^2) + 1(2) + 1 = 11_10. To convert 25_10 to base two, repeated division gives remainders 1, 0, 0, 1, 1, so 25_10 = 11001_2.",
    check: "Check a conversion by converting the result back to the starting base. In base b, every digit must be an integer from 0 to b-1.",
  },
  "Modular Arithmetic": {
    idea: "Modulo arithmetic compares remainders after division by a fixed positive integer n. The statement a is congruent to b modulo n means n divides a-b.",
    method: "Reduce numbers to their remainders before adding or multiplying. For division modulo n, first find a multiplicative inverse; division is not always possible.",
    example: "Since 17 leaves remainder 2 when divided by 5, 17 is congruent to 2 modulo 5. Thus (17+9) modulo 5 is the same as (2+4) modulo 5, which is 1.",
    check: "Keep the modulus visible at every step and reduce the final result to a remainder from 0 to n-1.",
  },
  "Fractions, Decimals and Approximations": {
    idea: "A fraction represents a quotient. Decimal place value is based on powers of one tenth, and an approximation replaces a value with a nearby value at a stated precision.",
    method: "Simplify fractions by dividing numerator and denominator by a common factor. Use a common denominator to add or subtract. For rounding, identify the required place and inspect the digit immediately to its right.",
    example: "To add 2/3 and 1/4, use denominator 12: 8/12 + 3/12 = 11/12. To round 7.386 to two decimal places, inspect the third decimal digit 6 and round 7.38 up to 7.39.",
    check: "Estimate before calculating and state the requested precision. Percentage error is |approximation-actual value| / |actual value| x 100%.",
  },
  "Indices": {
    idea: "An index tells how many times a base is used as a factor. For non-zero a, a^m a^n=a^(m+n), a^m/a^n=a^(m-n), (a^m)^n=a^(mn), a^0=1, and a^-n=1/a^n.",
    method: "Rewrite terms with a common base, apply one index law at a time, then simplify. Fractional powers represent roots: a^(1/n) is the nth root of a where defined.",
    example: "x^3 x^4 = x^7; (2^3)^2 = 2^6 = 64; and 3^-2 = 1/9. For 16^(1/2), take the square root to get 4.",
    check: "Do not add indices when bases differ, and do not distribute powers over addition: (a+b)^2 is not a^2+b^2.",
  },
  "Standard Form": {
    idea: "Standard form writes a number as A x 10^n, where 1 <= |A| < 10 and n is an integer.",
    method: "Move the decimal point until one non-zero digit remains to its left. Moving left gives a positive exponent; moving right gives a negative exponent. For multiplication add exponents; for division subtract them; align powers before addition or subtraction.",
    example: "450000 = 4.5 x 10^5 and 0.0032 = 3.2 x 10^-3. (2 x 10^4)(3 x 10^2)=6 x 10^6.",
    check: "After calculation, normalize the coefficient so its absolute value is at least 1 but less than 10.",
  },
  "Logarithms": {
    idea: "A logarithm answers the question: to what power must a base be raised to obtain a number? log_b(x)=y exactly when b^y=x, with b>0, b!=1, and x>0.",
    method: "Convert between logarithmic and index forms. Use log(xy)=log x+log y, log(x/y)=log x-log y, and log(x^r)=r log x. Check that all logarithm arguments are positive.",
    example: "log_10(1000)=3 because 10^3=1000. Also log_10(20)=log_10(2)+log_10(10)=log_10(2)+1.",
    check: "Verify a solution by substituting it into the original exponential or logarithmic equation; reject values that make an argument zero or negative.",
  },
  "Sequences and Series": {
    idea: "A sequence is an ordered list following a rule; a series is the sum of terms. An arithmetic sequence has constant difference d; a geometric sequence has constant ratio r.",
    method: "For arithmetic sequences use T_n=a+(n-1)d and S_n=n/2[2a+(n-1)d]. For geometric sequences use T_n=ar^(n-1); for r!=1, S_n=a(r^n-1)/(r-1). Identify a, d or r before substituting.",
    example: "For 3, 7, 11, ... the difference is 4, so T_10=3+9(4)=39. The sum of its first ten terms is 10/2(3+39)=210.",
    check: "Test the rule against the first few terms and distinguish the nth term from the sum of n terms.",
  },
  Sets: {
    idea: "A set is a collection of distinct objects. A union contains elements in either set; an intersection contains elements common to both; a complement contains elements in the universal set but not in the given set.",
    method: "List or describe elements clearly, identify the universal set, then use Venn diagrams to organize overlaps. For two sets, n(A union B)=n(A)+n(B)-n(A intersection B).",
    example: "If n(A)=18, n(B)=12 and n(A intersection B)=5, then n(A union B)=18+12-5=25.",
    check: "Count the overlap once only. Check that every region in a Venn diagram represents a disjoint group.",
  },
  "Logical Reasoning": {
    idea: "A proposition is a statement with a truth value. Negation reverses truth, conjunction is true only when both statements are true, and disjunction is true when at least one is true.",
    method: "Name simple statements, translate connectives carefully, and build a truth table by listing every truth-value combination. For n simple propositions there are 2^n rows.",
    example: "For p AND q, the result is true only in the row where p and q are both true. For p OR q, it is false only when both are false.",
    check: "Distinguish inclusive OR from everyday exclusive OR unless the question specifies otherwise.",
  },
  "Rational Numbers": {
    idea: "A rational number can be written as p/q for integers p and q with q not zero. Its decimal expansion terminates or recurs.",
    method: "Use a common denominator for addition and subtraction, multiply numerators and denominators for products, and multiply by the reciprocal for division. Reduce the result to lowest terms.",
    example: "3/4 - 1/6 = 9/12 - 2/12 = 7/12. Also 2/5 divided by 3/7 equals 2/5 x 7/3 = 14/15.",
    check: "Never divide by zero. Use a decimal estimate to check the size and sign of the result.",
  },
  Surds: {
    idea: "A surd is an irrational root left in exact form. Simplifying a surd extracts perfect-square or perfect-power factors.",
    method: "Factor the number under the root into a perfect power and a remainder. Combine like surds only when their root parts match. Rationalize a denominator by multiplying by a suitable surd or conjugate.",
    example: "sqrt(72)=sqrt(36 x 2)=6sqrt(2). Thus 3sqrt(2)+5sqrt(2)=8sqrt(2), while sqrt(2)+sqrt(3) cannot be combined.",
    check: "Estimate with nearby squares and retain exact form unless a decimal approximation is requested.",
  },
  "Matrices and Determinants": {
    idea: "A matrix is a rectangular array. Addition requires equal dimensions; multiplication AB is defined when the columns of A equal the rows of B. For [[a,b],[c,d]], the determinant is ad-bc.",
    method: "Check matrix orders first. Multiply rows by columns. A 2x2 inverse is 1/(ad-bc)[[d,-b],[-c,a]] when ad-bc is non-zero.",
    example: "For [[1,2],[3,4]], the determinant is 1(4)-2(3)=-2, so the inverse exists. The inverse is -1/2 [[4,-2],[-3,1]].",
    check: "Matrix multiplication is generally not commutative: AB need not equal BA. Verify an inverse by multiplying it by the original matrix.",
  },
  "Ratio, Proportion and Rates": {
    idea: "A ratio compares quantities in the same units. A proportion states that two ratios are equal; a rate compares quantities measured in different units.",
    method: "Convert quantities to common units, simplify ratios by a common factor, and use equivalent fractions to solve proportions. For direct proportion y=kx; for inverse proportion y=k/x.",
    example: "Share 60 in the ratio 2:3. There are 5 parts, so one part is 12 and the shares are 24 and 36.",
    check: "Confirm that the parts add to the original total and include units for rates such as km/h or cost per item.",
  },
  Percentages: {
    idea: "Percent means per hundred. A percentage change compares the change with the original amount, not the final amount.",
    method: "Convert p% to p/100. For an increase multiply by 1+p/100; for a decrease multiply by 1-p/100. Reverse percentage problems require dividing by the multiplier.",
    example: "An item costing 800 increased by 15% costs 800(1.15)=920. If 920 is the price after a 15% increase, the original price is 920/1.15=800.",
    check: "Use the original value as the denominator when calculating percentage change.",
  },
  "Financial Arithmetic": {
    idea: "Financial arithmetic applies arithmetic to money, prices, interest, tax, exchange, depreciation, and instalment purchases.",
    method: "Identify the principal, rate, time, and compounding period. Simple interest is I=Prt; compound amount is A=P(1+r)^t when periods match. Separate deposits, discounts, tax, and charges in a clear table.",
    example: "Simple interest on 20,000 at 5% per year for 3 years is I=20,000 x 0.05 x 3=3,000; the total is 23,000.",
    check: "Convert percentages to decimals and align the rate period with the time period. Read hire-purchase totals including deposit and instalments.",
  },
  "Binary Operations": {
    idea: "A binary operation combines two elements according to a defined rule, often written a * b. Its properties depend on the set and rule.",
    method: "Substitute carefully into the given rule, respecting brackets. Test closure, commutativity, associativity, identity, and inverse separately using definitions.",
    example: "If a*b=a+b+1, then 2*3=6. An identity e must satisfy a*e=e*a=a for every a in the stated set.",
    check: "Do not assume familiar arithmetic properties. Verify a proposed identity or inverse on both sides of the operation.",
  },
  "Algebraic Expressions": {
    idea: "An algebraic expression combines variables, constants, and operations. Like terms have identical variable parts and can be combined by adding coefficients.",
    method: "Collect like terms, use the distributive law to expand, and factor by identifying common factors or standard patterns. For fractions, factor numerator and denominator before cancelling common factors.",
    example: "3x+2x-4=5x-4. Also x^2-9=(x-3)(x+3). In a fraction, cancel factors, never individual terms separated by addition.",
    check: "Expand a factorised answer to verify it. State restrictions where a cancelled denominator factor could be zero.",
  },
  "Linear Equations and Inequalities": {
    idea: "A linear equation has a variable of power one. An inequality compares values using <, >, <=, or >=.",
    method: "Apply inverse operations to both sides to isolate the variable. For inequalities, reverse the inequality sign only when multiplying or dividing by a negative number.",
    example: "3x-5=10 gives 3x=15, so x=5. For -2x<8, division by -2 reverses the sign: x>-4.",
    check: "Substitute an equation solution into the original statement. Test an inequality with a value in the solution region.",
  },
  "Quadratic Equations": {
    idea: "A quadratic equation has the form ax^2+bx+c=0 with a not zero. Its graph is a parabola and it can have two, one, or no real roots.",
    method: "Set the equation to zero, then factorise, complete the square, or use x=(-b +/- sqrt(b^2-4ac))/(2a). The discriminant b^2-4ac determines the number of real roots.",
    example: "x^2-5x+6=0 factorises to (x-2)(x-3)=0, so x=2 or x=3.",
    check: "Substitute both roots into the original equation. Keep signs in b and c when using the quadratic formula.",
  },
  "Simultaneous Linear Equations": {
    idea: "A pair of simultaneous equations must be true for the same values of the variables. Their graphs are lines; a unique solution is their intersection.",
    method: "Use elimination to remove a variable, substitution to replace a variable, or a graph for an estimate. For word problems, define variables and translate each condition into an equation.",
    example: "For x+y=7 and x-y=1, adding gives 2x=8, hence x=4 and y=3.",
    check: "Substitute the ordered pair into every original equation, not just the one used last.",
  },
  Variation: {
    idea: "Variation describes how one quantity changes with another. Direct variation has y=kx; inverse variation has y=k/x; joint variation may have y=kxz.",
    method: "Write the proportional relationship, introduce the constant k, use the supplied values to find k, then calculate the unknown quantity.",
    example: "If y varies directly as x and y=18 when x=6, k=18/6=3, so y=3x. When x=10, y=30.",
    check: "Test whether the relationship is direct, inverse, joint, or partial before choosing a formula.",
  },
  Mensuration: {
    idea: "Mensuration measures lengths, perimeters, areas, surface areas, and volumes. A formula must match the shape and the dimensions supplied.",
    method: "Sketch and label the figure, convert all measurements to consistent units, select the formula, substitute values, and include square or cubic units as appropriate.",
    example: "A rectangle of length 8 cm and width 5 cm has area 8 x 5 = 40 cm^2 and perimeter 2(8+5)=26 cm.",
    check: "Area uses square units and volume uses cubic units. Check whether a question asks for curved surface area or total surface area.",
  },
  "Plane Geometry": {
    idea: "Plane geometry studies points, lines, angles, polygons, and circles. Many problems depend on a small set of angle and shape properties.",
    method: "Draw or mark the diagram, list known equal or parallel features, write the relevant theorem, and form an equation before calculating.",
    example: "Angles on a straight line sum to 180 degrees. If one angle is 65 degrees, the adjacent angle on the line is 115 degrees.",
    check: "Give a reason for each angle equality and distinguish a diagram drawn to scale from a stated geometric fact.",
  },
  "Coordinate Geometry": {
    idea: "Coordinate geometry represents points and lines using ordered pairs (x,y). Gradient measures vertical change divided by horizontal change.",
    method: "For points (x1,y1) and (x2,y2), gradient m=(y2-y1)/(x2-x1); midpoint is ((x1+x2)/2,(y1+y2)/2); distance is sqrt((x2-x1)^2+(y2-y1)^2). A line can be written y=mx+c.",
    example: "Between (1,2) and (5,10), the gradient is (10-2)/(5-1)=2.",
    check: "Keep x and y differences in the same order. Parallel lines have equal gradients; non-vertical perpendicular lines have gradients whose product is -1.",
  },
  Trigonometry: {
    idea: "In a right triangle, sin(theta)=opposite/hypotenuse, cos(theta)=adjacent/hypotenuse, and tan(theta)=opposite/adjacent. These ratios connect angles and side lengths.",
    method: "Mark the angle, label opposite, adjacent, and hypotenuse, choose the ratio containing the known and unknown values, then solve. Use the sine or cosine rule for non-right triangles when appropriate.",
    example: "If opposite=6 and hypotenuse=10, sin(theta)=6/10=0.6, so theta is approximately 36.9 degrees.",
    check: "Set the calculator to degrees when required. In bearings and elevation problems, draw a clear north line or horizontal reference.",
  },
  Statistics: {
    idea: "Statistics organizes and summarizes data. The mean uses all values, the median is the middle ordered value, and the mode is the most frequent value.",
    method: "Sort raw data before finding median or quartiles. For frequency tables, multiply each value by its frequency for the mean: sum(fx)/sum(f). Choose a graph that matches the type of data.",
    example: "For 2, 3, 3, 8, the mean is 16/4=4, the median is (3+3)/2=3, and the mode is 3.",
    check: "Use frequency density, not raw frequency, for histograms with unequal class widths. Label axes and units.",
  },
  Probability: {
    idea: "Probability measures how likely an event is, from 0 (impossible) to 1 (certain). For equally likely outcomes, P(A)=favourable outcomes/total outcomes.",
    method: "List the sample space, identify favourable outcomes, and use complements where convenient: P(not A)=1-P(A). For independent events multiply probabilities; for mutually exclusive alternatives add them.",
    example: "A fair die has three even outcomes out of six, so P(even)=3/6=1/2.",
    check: "Confirm probabilities lie between 0 and 1 and that mutually exclusive outcomes in a complete sample space sum to 1.",
  },
  "Introductory Calculus": {
    idea: "Differentiation measures instantaneous rate of change and gradient. Integration reverses differentiation and can represent accumulated change or area.",
    method: "For powers, d/dx(x^n)=n x^(n-1). Integrate x^n as x^(n+1)/(n+1)+C for n not equal to -1. Use a constant of integration for indefinite integrals.",
    example: "If y=3x^2+2x, dy/dx=6x+2. An antiderivative of 4x^3 is x^4+C.",
    check: "Differentiate an antiderivative to verify it. For stationary points set dy/dx=0 and use context or a second derivative to classify them.",
  },
  Vectors: {
    idea: "A vector has magnitude and direction; a scalar has magnitude only. In two dimensions a vector can be represented by components (x,y).", 
    method: "Add or subtract corresponding components. The magnitude of (x,y) is sqrt(x^2+y^2). Multiply each component by the scalar factor.",
    example: "(2,3)+(-1,4)=(1,7). The magnitude of (3,4) is sqrt(9+16)=5.",
    check: "Keep direction information and distinguish a position vector from a displacement vector between points.",
  },
  Transformation: {
    idea: "A transformation maps points or shapes to new positions. Translation, reflection, rotation, and enlargement preserve different properties.",
    method: "Track key vertices and state the transformation using its defining information: vector for translation, mirror line for reflection, centre and angle for rotation, or centre and scale factor for enlargement.",
    example: "A translation by vector (3,-2) maps (x,y) to (x+3,y-2). Thus (1,5) maps to (4,3).",
    check: "Compare lengths and angles before and after. A negative enlargement scale factor reverses direction through the centre.",
  },
  "Units and Measurement": {
    idea: "Measurement assigns numbers and units to quantities. SI units provide a standard system, while prefixes indicate powers of ten.",
    method: "Write the starting and target units, use a conversion factor, and check whether the numerical value should grow or shrink. For area and volume, square or cube the linear conversion factor.",
    example: "1.5 km = 1.5 x 1000 m = 1500 m. Since 1 m=100 cm, 1 m^2=10,000 cm^2.",
    check: "Include units in every final measurement and consider instrument precision when reporting accuracy.",
  },
}

const englishUnits = {
  Lexis: {
    idea: "Lexis is the vocabulary of a language and the way words combine to create precise meaning. Word choice depends on context, register, collocation, and figurative use.",
    method: "Use surrounding clauses to infer meaning, identify the grammatical role of the word, and test a replacement in the sentence. Learn collocations as natural word partnerships; interpret idioms as whole expressions rather than literally.",
    example: "In 'The evidence was compelling, so the jury listened closely', compelling means convincing. The context of evidence and listening helps rule out unrelated meanings.",
    check: "Distinguish a word's dictionary meaning from its meaning in context, and avoid selecting a synonym that changes tone or grammar.",
  },
  Structure: {
    idea: "English structure covers how words change form and how words are arranged into phrases, clauses, and sentences. Agreement and word order help readers identify relationships.",
    method: "Find the sentence's subject and main verb first. Check number and tense, then examine how determiners, prepositions, and conjunctions link the remaining parts.",
    example: "'Each of the players is ready' takes 'is' because the head subject 'each' is singular, even though 'players' is plural.",
    check: "Read the completed sentence aloud and verify that the selected form agrees with the true subject, not a nearby noun.",
  },
  "Essay Writing": {
    idea: "Effective essay writing answers the task, develops ideas in a logical order, and uses a style suited to its audience and purpose.",
    method: "Plan the purpose, audience, format, and main points. Build a clear opening, focused paragraphs, suitable linking, and a conclusion. Support claims with relevant details and revise grammar, punctuation, and spelling.",
    example: "For an argument essay, state your position, give one reason per paragraph, support each reason with an example, acknowledge a counterargument fairly, and conclude by returning to the question.",
    check: "Before submitting, confirm that every paragraph supports the task and that the format matches the requested letter, speech, report, article, narration, description, debate, exposition, or creative piece.",
  },
  Comprehension: {
    idea: "Comprehension requires understanding explicit facts and interpreting what a writer implies, feels, or intends. Answers must be grounded in the passage.",
    method: "Read the question carefully, locate the relevant passage section, identify evidence, and answer in your own words where required. Use surrounding sentences to resolve vocabulary and tone.",
    example: "If a character 'paused at the door and kept looking back', the passage may imply reluctance or worry; choose the interpretation supported by nearby events, not a guess about the character.",
    check: "For factual questions, do not add information absent from the passage. For inference, cite clues and avoid claims stronger than the evidence.",
  },
  Summary: {
    idea: "A summary selects only information relevant to the stated focus and expresses it concisely without changing the meaning.",
    method: "Identify the exact aspects requested, locate only relevant points, combine related ideas, remove examples and repetition, and use accurate concise sentences. Observe any word limit.",
    example: "If asked for causes, include causes only; do not add effects or solutions even if they appear in the same paragraph.",
    check: "Compare every sentence with the passage, remove repeated ideas, and ensure the final version answers the specified question directly.",
  },
  "Oral English": {
    idea: "Oral English studies speech sounds, syllables, stress, rhyme, and intonation. A sound is identified by how it is produced and how it functions in a word.",
    method: "Listen for the target sound, divide words into syllables, mark the stressed syllable, and use phonetic symbols to represent sounds rather than spelling. In sentence stress, notice which word receives emphasis and how intonation changes meaning.",
    example: "The spelling 'th' represents different sounds in 'thin' and 'this'; spelling alone does not identify pronunciation. A rhyme shares the ending sound from the final stressed vowel onward.",
    check: "Separate letters from sounds, count syllables by spoken units, and use a consistent model pronunciation when comparing accents.",
  },
}

const civicUnits = {
  Values: {
    idea: "Values are standards and beliefs people use to judge what is important, desirable, or acceptable. They influence choices and behaviour.",
    method: "Define a value clearly, distinguish personal and shared values, and explain its effect on individuals and society with a relevant example.",
    example: "Honesty is a value because it guides a person to communicate truthfully. When practiced in public life, it can build trust in institutions.",
    check: "Do not confuse a value with a law: values guide judgement, while laws are formal rules enforced by constituted authority.",
  },
  "Citizenship and Nationalism": {
    idea: "Citizenship is legal membership of a state, with associated rights and responsibilities. Nationalism is commitment to a nation's identity, welfare, and self-determination.",
    method: "Separate legal citizenship from participation and national identity. When discussing duties, explain how each action supports community life and national development.",
    example: "Obeying valid laws, respecting others' rights, and participating peacefully in public affairs are ways citizens contribute to society.",
    check: "Responsible nationalism promotes unity and civic responsibility without denying the rights or dignity of other groups.",
  },
  "Human Rights": {
    idea: "Human rights are basic entitlements and freedoms belonging to people by virtue of being human. They include civil, political, economic, social, and cultural rights.",
    method: "Name the right, describe the protection it provides, and explain any lawful limitation in context. Distinguish a right from a responsibility or policy benefit.",
    example: "Freedom of expression protects the ability to communicate opinions, while laws may restrict threats or incitement to protect the rights and safety of others.",
    check: "Avoid claiming that a right is unlimited; explain that restrictions must be lawful and justified.",
  },
  "Law and Order": {
    idea: "Law and order refer to rules and institutions that maintain peace, protect rights, and regulate conduct. Constituted authorities exercise powers established by law.",
    method: "Identify the relevant authority, its lawful responsibility, and the civic safeguard that makes its action accountable.",
    example: "A court interprets and applies law in disputes. Its independence helps ensure decisions are based on evidence and legal rules.",
    check: "Distinguish lawful authority from arbitrary power; public officials remain subject to the law.",
  },
  "Responsible Parenthood": {
    idea: "Responsible parenthood means providing care, guidance, protection, and support suited to children's needs and rights.",
    method: "Explain the parent's role, connect it to a child's development, and avoid treating care as only financial provision.",
    example: "Supporting a child's education includes providing learning opportunities, communicating with teachers, and encouraging regular study.",
    check: "Relate family responsibilities to child welfare and wider community development without stereotyping family roles.",
  },
  "Traffic Regulations": {
    idea: "Traffic regulations coordinate road use and reduce risks to drivers, passengers, cyclists, and pedestrians.",
    method: "Identify the rule, the road user it protects, and the likely consequence of compliance or violation.",
    example: "Stopping at a red traffic light protects people crossing and prevents conflicting vehicle movements at an intersection.",
    check: "Describe traffic safety as a shared responsibility of road users and public authorities.",
  },
  "Inter-Personal Relationships": {
    idea: "Interpersonal relationships are connections between people and groups. Communication, empathy, cooperation, and respect help maintain them.",
    method: "Identify the parties and source of disagreement, then choose a response that listens, states needs clearly, and seeks a fair solution.",
    example: "In a group disagreement, each side can explain its concern, agree on shared goals, and negotiate responsibilities.",
    check: "Separate a person from the problem and avoid presenting force or humiliation as conflict resolution.",
  },
  Cultism: {
    idea: "Cultism refers to involvement in secretive groups that may use coercion, violence, or unlawful practices. Effects can harm members, families, and communities.",
    method: "Discuss causes without excusing harm, identify consequences, and propose prevention through support, safe reporting, education, and lawful intervention.",
    example: "A school can reduce recruitment risk through mentoring, inclusive activities, confidential reporting channels, and consistent safeguarding procedures.",
    check: "Do not reproduce operational symbols or recruitment details; keep the focus on prevention, safety, and support.",
  },
  "Drugs and Drug Abuse": {
    idea: "A drug is a substance that affects body or mind. Misuse includes harmful use or use outside appropriate medical directions; dependence may require professional care.",
    method: "Distinguish medical use from misuse, describe health and social risks accurately, and identify safe prevention and support options.",
    example: "Taking another person's prescription medicine can be dangerous because the drug, dose, or interactions may not be suitable for the user.",
    check: "Avoid stigma: describe substance-related harm as a health and safety issue and encourage support from qualified services.",
  },
  "Human Trafficking": {
    idea: "Human trafficking involves exploitation through acts such as recruitment or movement using coercion, deception, or abuse of vulnerability.",
    method: "Explain the exploitative purpose, identify risk factors without blaming victims, and describe safe prevention or reporting responses.",
    example: "A person promised legitimate work but then forced to work under threats and unable to leave may be experiencing exploitation that requires trained support.",
    check: "Prioritize victim safety and confidentiality; do not confront suspected traffickers or publish identifying details.",
  },
  "HIV/AIDS": {
    idea: "HIV is a virus that attacks parts of the immune system. AIDS describes an advanced stage of HIV-related immune damage; treatment can greatly improve health.",
    method: "Use current, non-stigmatizing health information. Distinguish transmission routes from casual contact and discuss prevention, testing, and treatment respectfully.",
    example: "HIV is not spread by sharing a classroom, handshake, or ordinary household items. Accurate information helps reduce stigma.",
    check: "Do not infer a person's HIV status from appearance; diagnosis requires appropriate testing by health professionals.",
  },
  "Youth Empowerment": {
    idea: "Youth empowerment develops young people's skills, confidence, opportunities, and participation so they can make informed choices and contribute to society.",
    method: "Identify a need, match it to a skill or opportunity, and explain how the young person and community benefit.",
    example: "A vocational training programme can build practical skills that improve employment options and local service capacity.",
    check: "Empowerment is more than giving resources; include participation, capability, and access to meaningful opportunities.",
  },
  "Structure and Functions of Government": {
    idea: "Government makes and implements public decisions through institutions and levels of authority. In Nigeria, governmental responsibilities are distributed across federal, state, and local levels.",
    method: "Name the institution or tier, state its responsibility, and explain how it serves the public or is held accountable.",
    example: "Local government functions can include local services and community administration within powers established by law.",
    check: "Do not assume every public service belongs to one tier; check the constitutional or legal responsibility described in the question.",
  },
  "Democracy, Rule of Law and National Development": {
    idea: "Democracy enables public participation and accountable government. Rule of law requires that public power and citizens' conduct are governed by accessible, fairly applied laws.",
    method: "Define each concept separately, show their relationship, then connect them to development through accountability, rights protection, stability, and public services.",
    example: "Transparent elections can help citizens choose leaders, while independent courts and lawful procedures help constrain misuse of power between elections.",
    check: "An election alone does not guarantee democracy; consider participation, rights, accountability, and lawful institutions.",
  },
  "Political Apathy": {
    idea: "Political apathy is low interest or participation in public and political affairs. It can weaken representation and accountability.",
    method: "Distinguish causes, consequences, and remedies. Support each claim with a civic mechanism such as voter information, trust, accessibility, or participation.",
    example: "When eligible citizens do not participate, elected leaders may hear a narrower range of community priorities.",
    check: "Do not treat all non-participation as apathy; barriers such as safety, access, or disenfranchisement may be involved.",
  },
  "Civil Society and Popular Participation": {
    idea: "Popular participation is people's involvement in decisions affecting them. Civil society includes voluntary groups outside government and business that organize around shared interests.",
    method: "Identify the channel of participation, who it includes, and how it can influence decisions. Evaluate both its contribution and possible barriers.",
    example: "A community association can gather residents' concerns and submit them during a public consultation.",
    check: "Participation includes more than elections; distinguish peaceful civic action from activities that violate others' rights.",
  },
  "Public Service in Democracy": {
    idea: "The public service implements laws and policies and provides services to the public. In a democracy it should operate professionally, fairly, and accountably.",
    method: "Describe the service function, identify a challenge such as delay or poor accountability, and suggest a practical improvement with public oversight.",
    example: "Clear service standards and accessible complaint channels can help residents track applications and report delays.",
    check: "Separate the role of elected officials, who set policy, from public servants, who administer it under law.",
  },
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character])
}

function unitFor(subjectSlug, topicTitle) {
  if (subjectSlug === "english-language") return englishUnits[topicTitle]
  if (subjectSlug === "civic-education") return civicUnits[topicTitle]
  return mathUnits[topicTitle]
}

function lessonContent(subjectSlug, topicTitle, subtopicTitle, unit) {
  const safeSubtopic = escapeHtml(subtopicTitle)
  const practice = subjectSlug === "english-language"
    ? `Apply the method to a short text or sentence containing <strong>${safeSubtopic}</strong>. Write down the evidence that supports your answer, then check that your response follows the question's instructions.`
    : `Apply the rule to a new question on <strong>${safeSubtopic}</strong>. Write each step, include the correct units or notation, and substitute your result back into the original problem where possible.`
  return `
<h2>Learning goals</h2>
<p>By the end of this lesson, you should be able to explain the main idea in ${safeSubtopic}, use the standard method accurately, and check whether your answer is reasonable.</p>

<h2>Core idea</h2>
<p>${escapeHtml(unit.idea)}</p>
<p>This lesson focuses on <strong>${safeSubtopic}</strong> within ${escapeHtml(topicTitle)}. Connect the key idea to the exact wording of a question before choosing a method.</p>

<h2>Method</h2>
<ol>
  <li>Read the task and identify the information or skill it asks for.</li>
  <li>Choose the rule, convention, or structure that applies to ${safeSubtopic}.</li>
  <li>Work in a clear order, showing the important reasoning rather than jumping to a result.</li>
  <li>Check accuracy, meaning, units, and whether the response answers the question asked.</li>
</ol>
<p>${escapeHtml(unit.method)}</p>

<h2>Worked example</h2>
<p>${escapeHtml(unit.example)}</p>

<h2>Common errors to avoid</h2>
<ul>
  <li>Choosing a method before identifying what the question requires.</li>
  <li>Skipping a step that makes the reasoning difficult to check.</li>
  <li>Ignoring the wording, conventions, or conditions stated in the question.</li>
  <li>Leaving the final response unchecked for accuracy and completeness.</li>
</ul>

<h2>Check your understanding</h2>
<p>${practice}</p>
<p><strong>Self-check:</strong> ${escapeHtml(unit.check)}</p>

<h2>Key points</h2>
<ul>
  <li>Explain the central idea in your own words.</li>
  <li>Choose a method that fits the exact task.</li>
  <li>Show enough working or evidence for another reader to follow.</li>
  <li>Check your answer before moving on to practice.</li>
</ul>
`
}

async function main() {
  const syllabusResult = await pool.query(`
    SELECT sy.id AS syllabus_id, sy.exam, sy.syllabus_year, sub.slug AS subject_slug
    FROM syllabuses sy
    JOIN subjects sub ON sub.id = sy.subject_id
    WHERE sy.is_active = TRUE
      AND sy.exam = 'WAEC'
      AND sub.slug IN ('english-language', 'general-mathematics', 'civic-education')
    ORDER BY sub.slug, sy.created_at DESC
  `)

  const latestBySubject = new Map()
  for (const syllabus of syllabusResult.rows) {
    if (!latestBySubject.has(syllabus.subject_slug)) {
      latestBySubject.set(syllabus.subject_slug, syllabus)
    }
  }

  for (const subjectSlug of ["english-language", "general-mathematics", "civic-education"]) {
    const syllabus = latestBySubject.get(subjectSlug)
    if (!syllabus) throw new Error(`No active WAEC syllabus found for ${subjectSlug}`)

    const result = await pool.query(`
      SELECT
        t.id AS topic_id,
        t.title AS topic_title,
        t.topic_order,
        st.id AS subtopic_id,
        st.title AS subtopic_title,
        st.slug AS subtopic_slug,
        st.subtopic_order
      FROM topics t
      JOIN subtopics st ON st.topic_id = t.id AND st.is_active = TRUE
      WHERE t.syllabus_id = $1 AND t.is_active = TRUE
      ORDER BY t.topic_order, st.subtopic_order
    `, [syllabus.syllabus_id])

    let inserted = 0
    for (const row of result.rows) {
      const unit = unitFor(subjectSlug, row.topic_title)
      if (!unit) throw new Error(`Missing lesson guide for ${subjectSlug}: ${row.topic_title}`)

      const title = `${row.subtopic_title}: Complete Lesson`
      const slug = `complete-${row.subtopic_slug}`
      const content = lessonContent(subjectSlug, row.topic_title, row.subtopic_title, unit)
      const lessonOrder = row.subtopic_order

      await pool.query(`
        INSERT INTO lessons (
          topic_id, subtopic_id, title, slug, content, lesson_order, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, TRUE)
        ON CONFLICT (topic_id, slug)
        DO UPDATE SET
          subtopic_id = EXCLUDED.subtopic_id,
          title = EXCLUDED.title,
          content = EXCLUDED.content,
          lesson_order = EXCLUDED.lesson_order,
          is_active = TRUE
      `, [row.topic_id, row.subtopic_id, title, slug, content, lessonOrder])
      inserted++
    }

    console.log(`${subjectSlug}: ${inserted} subtopic lessons seeded from ${syllabus.syllabus_year}.`)

    if (subjectSlug === "civic-education") {
      await pool.query(`
        INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active)
        SELECT $1, e.id, TRUE
        FROM exams e
        WHERE e.slug IN ('waec', 'gce') AND e.is_active = TRUE
        ON CONFLICT (syllabus_id, exam_id)
        DO UPDATE SET is_active = TRUE
      `, [syllabus.syllabus_id])
      console.log("civic-education: syllabus linked to WAEC and GCE only.")
    }
  }
}

main()
  .catch((error) => {
    console.error("English and Mathematics lesson seeding failed:", error.message)
    process.exitCode = 1
  })
  .finally(() => pool.end())
