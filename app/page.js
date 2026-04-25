export default function RootPage() {
    return (
        <main className="min-h-dvh flex items-center justify-center bg-primary-dark-900 text-primary-bright-100">
            <div className="text-center space-y-4">
                <h1 className="font-teko text-6xl">Gym Assistant</h1>
                <p className="text-primary-bright-300">
                    Visit your gym website at{" "}
                    <span className="text-red-500">slug.urelaa.com</span> or{" "}
                    <span className="text-red-500">localhost:3090/your-slug</span>
                </p>
            </div>
        </main>
    );
}
