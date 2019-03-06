TARGET := alshayun-report.pdf

all: $(TARGET)

%.pdf: %.tex
	pdflatex $<
	pdflatex $<

clean:
	rm -f *.aux *.log *.toc *.out $(TARGET)

.PHONY: all clean
