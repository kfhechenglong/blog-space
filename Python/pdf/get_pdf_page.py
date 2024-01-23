from PyPDF2 import PdfReader, PdfWriter
import glob
 
def process_bar(no, total_length):
    bar = '\r' + str(no) + '|' + str(total_length) + '\n'
    print(bar, end='', flush=True)
 
 
def split_combine(path, pdf_writer):
    pdf = PdfReader(path)
    print(len(pdf.pages))
    print(path + '\n')
    # lastest page
    filename = "config.txt"
    with open(filename) as file_object:
        count = file_object.read()
        print(count)
    if int(count) <= len(pdf.pages) and int(count) >=0:
        page = pdf.pages[int(count)]
        pdf_writer.add_page(page)
    elif int(count) < 0 and int(count) >= -len(pdf.pages):
        page = pdf.pages[int(count)]
        pdf_writer.add_page(page)
    else:
        print('输入的页码不正确')
 
if __name__ == '__main__':
    # get curren dir pdf files
    pdf_list = glob.glob('pdf/*.pdf')
    pdf_writer = PdfWriter()
    for i, pdf_file in enumerate(pdf_list):
        print(pdf_file)
        # progresss-bar
        process_bar(i + 1, len(pdf_list))
        split_combine(pdf_file, pdf_writer)
    with open('new.pdf', 'wb') as output_pdf:
        pdf_writer.write(output_pdf)