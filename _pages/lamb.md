---
permalink: /lamb/
title: "Laboratory for Advanced Microscopy and Bioengineering"
author_profile: true
---

The **Laboratory for Advanced Microscopy and Bioengineering (The LAMB)** at East Tennessee State University develops optical and engineering tools to address open problems in biology, medicine, and the emerging bioeconomy. We work across scales — from single cells imaged with ultrafast lasers to bioreactors running on open-source hardware — and across disciplines, because the most interesting problems rarely stay in one lane.

Our students get hands-on experience building instrumentation, designing experiments, and thinking about how science connects to real-world impact in the Appalachian region and beyond.

---

## Active Projects

<details>
<summary><strong>Downstream Processing Workforce Development</strong></summary>
<div markdown="1">

The emerging bioeconomy needs trained workers who understand not just how to grow biological products, but how to get them out. We are developing a suite of hybrid online and in-person training modules focused on **downstream processing** — the set of techniques used to separate and purify a valuable product once it has been produced in a living system.

Our curriculum covers:
- Centrifugation
- Filtration
- Chromatography
- Distillation
- Lyophilization
- Spray drying

This project is part of a broader effort to build bioeconomy workforce capacity in the Appalachian region, funded by over $1.3M in grants for biomanufacturing workforce development.

</div>
</details>

<details>
<summary><strong>Raman Spectroscopy in Mycological Systems</strong></summary>
<div markdown="1">

Yeasts and fungi are metabolically rich, biochemically complex, and largely underexplored as targets for vibrational imaging. Their distinct lipid profiles, cell wall compositions, and metabolic signatures make them ideal candidates for Raman-based analysis.

We are developing techniques to apply **Raman spectroscopy** to mycological systems with two main goals:

- **Fingerprinting** — using Raman spectra to classify and distinguish classes of fungi based on their molecular makeup, without the need for labels or stains
- **Process monitoring** — leveraging Raman as a real-time process analytical tool to track growth dynamics and chemical product development in oleaginous (oil-producing) yeasts

This work connects directly to biomanufacturing applications, where knowing what an organism is doing — and when — is critical to optimizing yield.

</div>
</details>

<details>
<summary><strong>Open-Hardware Bioreactor Development</strong></summary>
<div markdown="1">

Optimizing biological processes requires the ability to run many experiments, vary conditions, and iterate quickly. For resource-limited labs and institutions, the cost of commercial bioreactor systems is a significant barrier.

Our students are building **open-source, open-hardware bioreactors** at the 1–2 liter scale using off-the-shelf components and widely available control systems. The goal is to produce well-documented, reproducible designs that other low-resource labs can build and adapt — lowering the barrier to entry for bioprocess research and training across the region.

</div>
</details>

---

## Laboratory Members

<div style="display: flex; flex-direction: column; gap: 2em; margin-top: 1em; padding-left: 1.5em;">
{% for member in site.data.members %}
  <div style="display: flex; align-items: flex-start; gap: 1.5em;">
    {% if member.photo and member.photo != "" %}
      <img src="{{ base_path }}/images/members/{{ member.photo }}" alt="{{ member.name }}"
           style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%; flex-shrink: 0;">
    {% else %}
      <div style="width: 120px; height: 120px; border-radius: 50%; background: #e0e0e0; flex-shrink: 0;"></div>
    {% endif %}
    <div>
      <strong style="font-size: 1.05em;">{{ member.name }}</strong><br>
      <em style="font-size: 0.88em; color: #666;">{{ member.role }}</em>
      <p style="font-size: 0.9em; margin-top: 0.4em; color: #444;">{{ member.bio }}</p>
    </div>
  </div>
{% endfor %}
</div>

---

## Join the Lab

We are always looking for curious, motivated students at the undergraduate and graduate level. If any of these projects interest you, reach out at [princerc@etsu.edu](mailto:princerc@etsu.edu).
