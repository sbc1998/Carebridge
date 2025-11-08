<script>
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const classes = ['URL_AOP', 'APEX', 'WORKSPACE', 'FILENAME', 'DB_DIRECTORY', 'URL'];

  cards.forEach(card => {
    const mainClass = card.querySelector(".main_class");

    const downloadBtn = card.querySelector(".download_doc");
    const viewSourceBtn = card.querySelector(".view_source");
    const viewCodeBtn = card.querySelector(".view_code");

    const report = card.querySelector(".report");
    const aop_template = card.querySelector(".aop-template");
    const data_source = card.querySelector(".data_source_content");
    const template_source = card.querySelector(".template_source_content");

    // Hide all buttons initially
    [downloadBtn, viewSourceBtn, viewCodeBtn].forEach(btn => btn && (btn.style.display = 'none'));

    if (mainClass && classes.some(cls => mainClass.classList.contains(cls))) {
      if (downloadBtn) downloadBtn.style.display = "inline-block";
      if (viewCodeBtn) viewCodeBtn.style.display = "inline-block";

      viewCodeBtn?.addEventListener("click", () => {
        card.classList.toggle("active");
        data_source.style.display = "inline-block";
        template_source.style.display = "none";
      });
    }
    else if (mainClass && (mainClass.classList.contains('AOP') || mainClass.classList.contains('AOP_REPORT'))) {
      if (mainClass.classList.contains('URL1') || mainClass.classList.contains('PLSQL_SQL') || mainClass.classList.contains('PLSQL')) {
        if (viewCodeBtn) viewCodeBtn.style.display = 'inline-block';
        viewCodeBtn?.addEventListener("click", () => {
          card.classList.toggle("active");
          data_source.style.display = "inline-block";
          template_source.style.display = "none";
        });
      }

      if (mainClass.classList.contains('IR')) {
        if (report) report.style.display = 'inline-block';
        if (aop_template) aop_template.style.display = 'inline-block';
      }

      if (mainClass.classList.contains('XML') || mainClass.classList.contains('JSON') || mainClass.classList.contains('JSON_FILES') || mainClass.classList.contains('SQL')) {
        if (viewCodeBtn) viewCodeBtn.style.display = 'inline-block';
        if (aop_template) aop_template.style.display = 'inline-block';
        if (downloadBtn) downloadBtn.style.display = "none";

        viewCodeBtn?.addEventListener("click", () => {
          card.classList.toggle("active");
          data_source.style.display = "inline-block";
          template_source.style.display = "none";
        });
      }
    }
    else {
      if (viewCodeBtn) viewCodeBtn.style.display = "inline-block";
      if (viewSourceBtn) viewSourceBtn.style.display = 'inline-block';

      viewCodeBtn?.addEventListener("click", () => {
        card.classList.toggle("active");
        data_source.style.display = "inline-block";
        template_source.style.display = "none";
      });

      viewSourceBtn?.addEventListener("click", () => {
        card.classList.toggle("active");
        data_source.style.display = "none";
        template_source.style.display = "inline-block";
      });
    }
  });
});
</script>
