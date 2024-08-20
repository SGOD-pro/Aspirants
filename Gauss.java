class Gauss {
    static void print(double[][] a) {
        for (int i = 0; i < a.length; i++) {
            for (int j = 0; j < a[i].length; j++) {
                System.out.print(a[i][j] + " ");
            }
            System.out.println();
        }
    }

    public static void main(String args[]) {
        int size = 3;
        // int[][] a = new int[size][size + 1];
        double[][] a = {
                { 2, 3, 2, 2 },
                { 10, 3, 4, 16 },
                { 3, 6, 1, -6 }
        };
        int n = a.length;

        for (int k = 0; k < n - 1; k++) {
            for (int i = k + 1; i < n; i++) {
                double multiplier = -a[i][k] / a[k][k];
                for (int j = k; j < a[i].length; j++) {
                    a[i][j] += multiplier * a[k][j];
                }
            }
        }

        for (int i = a.length - 1; i >= 0; i--) {

        }
        print(a);
    }
}