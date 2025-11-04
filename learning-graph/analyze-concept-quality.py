#!/usr/bin/env python3
"""
Analyze the quality of concepts in learning-graph.csv
Checks for duplicates, formatting, length, and clarity
"""

import csv
from collections import Counter
from typing import List, Dict, Tuple

def is_title_case(text: str) -> bool:
    """Check if text is in Title Case (allowing for acronyms)"""
    words = text.split()
    for word in words:
        # Skip acronyms (all caps)
        if word.isupper() and len(word) > 1:
            continue
        # Skip single letters
        if len(word) == 1:
            continue
        # Check if first letter is capitalized
        if not word[0].isupper():
            return False
    return True

def analyze_concepts(csv_file: str) -> Dict:
    """Analyze concept list quality"""
    concepts = []
    duplicates = []
    formatting_issues = []
    length_issues = []

    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            label = row['ConceptLabel']
            concepts.append({
                'id': row['ConceptID'],
                'label': label,
                'dependencies': row['Dependencies'],
                'taxonomy': row['TaxonomyID']
            })

            # Check formatting
            if not is_title_case(label):
                formatting_issues.append(label)

            # Check length (target: under 32 characters)
            if len(label) > 32:
                length_issues.append((label, len(label)))

    # Check for duplicates
    label_counts = Counter(c['label'] for c in concepts)
    duplicates = [label for label, count in label_counts.items() if count > 1]

    # Calculate quality score
    total_concepts = len(concepts)
    unique_ratio = (total_concepts - len(duplicates)) / total_concepts
    formatting_ratio = (total_concepts - len(formatting_issues)) / total_concepts
    length_ratio = (total_concepts - len(length_issues)) / total_concepts

    quality_score = (unique_ratio * 40 + formatting_ratio * 30 + length_ratio * 30)

    return {
        'total_concepts': total_concepts,
        'duplicates': duplicates,
        'formatting_issues': formatting_issues,
        'length_issues': length_issues,
        'quality_score': quality_score,
        'concepts': concepts
    }

if __name__ == '__main__':
    result = analyze_concepts('learning-graph.csv')

    print(f"# Concept List Quality Analysis\n")
    print(f"**Total Concepts:** {result['total_concepts']}")
    print(f"**Quality Score:** {result['quality_score']:.1f}/100\n")

    print(f"## Duplicates: {len(result['duplicates'])}")
    if result['duplicates']:
        for dup in result['duplicates']:
            print(f"  - {dup}")
    else:
        print("  ✓ No duplicates found")

    print(f"\n## Formatting Issues: {len(result['formatting_issues'])}")
    if result['formatting_issues']:
        for issue in result['formatting_issues'][:10]:
            print(f"  - {issue}")
        if len(result['formatting_issues']) > 10:
            print(f"  ... and {len(result['formatting_issues']) - 10} more")
    else:
        print("  ✓ All concepts properly formatted")

    print(f"\n## Length Issues: {len(result['length_issues'])}")
    if result['length_issues']:
        for label, length in result['length_issues'][:10]:
            print(f"  - {label} ({length} chars)")
        if len(result['length_issues']) > 10:
            print(f"  ... and {len(result['length_issues']) - 10} more")
    else:
        print("  ✓ All concepts under 32 characters")

    print(f"\n## Summary")
    if result['quality_score'] >= 90:
        print("✓ Excellent quality - ready for glossary generation")
    elif result['quality_score'] >= 70:
        print("✓ Good quality - minor issues can be addressed during generation")
    else:
        print("⚠ Quality issues detected - consider cleaning before generation")
