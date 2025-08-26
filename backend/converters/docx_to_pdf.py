import subprocess
from pathlib import Path

def docx_to_pdf(input_path: str, output_path: str = None) -> str:
    """
    Konverteerib DOCX faili PDFiks LibreOffice'i abil.
    
    :param input_path: Sisendfaili tee (.docx)
    :param output_path: Väljundfaili tee (.pdf). 
                        Kui None, tehakse sama nimega PDF samasse kausta.
    :return: Väljund-PDF faili tee
    """
    input_path = Path(input_path).resolve()

    if not input_path.exists():
        raise FileNotFoundError(f"Sisendi faili ei leitud")
    
    if output_path is None:
        output_path = input_path.with_suffix(".pdf")
    else:
        output_path = Path(output_path).resolve()
    

    SOFFICE_PATH = r"C:\Program Files\LibreOffice\program\soffice.exe"

    cmd = [
        SOFFICE_PATH, "--headless",
        "--convert-to", "pdf",
        "--outdir", str(output_path.parent),
        str(input_path)
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Konverteerimine ebaõnnestus: {e.stderr.decode()}")

    if not output_path.exists():
        raise RuntimeError("PDF faili ei loodud. Kontrolli, et LibreOffice on paigaldatud.")

    return str(output_path)


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Kasutamine: python docx_to_pdf.py <input.docx> [output.pdf]")
        sys.exit(1)

    inp = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else None

    try:
        pdf_file = docx_to_pdf(inp, out)
        print(f"PDF loodud: {pdf_file}")
    except Exception as e:
        print("Viga:", e)