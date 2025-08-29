import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

# Create figure
fig, ax = plt.subplots(figsize=(10,6))
ax.axis('off')

# Define positions of agents
positions = {
    "User Location (Input Layer)": (0.1, 0.5),
    "Explorer Agent\n(FSQ API)": (0.4, 0.7),
    "Planner Agent\n(Gemini)": (0.7, 0.8),
    "Challenge Agent\n(Gemini)": (0.7, 0.5),
    "Explainer Agent\n(Planned)": (0.7, 0.3),
    "Safety Agent\n(Planned)": (0.7, 0.1),
    "PWA UI Layer": (0.9, 0.5)
}

# Draw nodes
for name, (x, y) in positions.items():
    if "Planned" in name:
        boxstyle = "round,pad=0.3"
        fc = "#ffe6e6"  # light red
    else:
        boxstyle = "round,pad=0.3"
        fc = "#e6ffe6"  # light green
    ax.add_patch(mpatches.FancyBboxPatch((x-0.1,y-0.05),0.2,0.1,boxstyle=boxstyle,fc=fc,ec="black"))
    ax.text(x, y, name, ha="center", va="center", fontsize=9, wrap=True)

# Draw arrows (connections)
connections = [
    ("User Location (Input Layer)", "Explorer Agent\n(FSQ API)"),
    ("Explorer Agent\n(FSQ API)", "Planner Agent\n(Gemini)"),
    ("Explorer Agent\n(FSQ API)", "Challenge Agent\n(Gemini)"),
    ("Explorer Agent\n(FSQ API)", "Explainer Agent\n(Planned)"),
    ("Explorer Agent\n(FSQ API)", "Safety Agent\n(Planned)"),
    ("Planner Agent\n(Gemini)", "PWA UI Layer"),
    ("Challenge Agent\n(Gemini)", "PWA UI Layer"),
    ("Explainer Agent\n(Planned)", "PWA UI Layer"),
    ("Safety Agent\n(Planned)", "PWA UI Layer")
]

for start, end in connections:
    x1, y1 = positions[start]
    x2, y2 = positions[end]
    ax.annotate("", xy=(x2-0.1,y2), xytext=(x1+0.1,y1),
                arrowprops=dict(arrowstyle="->", lw=1.2))

# Save diagram
output_img_path = "SoloNomad_Architecture_Diagram.png"
plt.savefig(output_img_path, bbox_inches="tight")
plt.close()

output_img_path
