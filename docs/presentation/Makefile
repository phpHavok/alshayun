TARGET := alshayun-presentation.pdf

all: $(TARGET)

%.pdf: %.tex
	pdflatex $<
	pdflatex $<

clean:
	rm -f *.aux *.log *.toc *.out *.lof *.snm *.nav $(TARGET)

.PHONY: all clean
